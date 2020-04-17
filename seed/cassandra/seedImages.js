"use strict";

const faker = require('faker');
const cassandra = require('cassandra-driver');
const Uuid = cassandra.types.Uuid;

const client = new cassandra.Client({ contactPoints: ['13.56.253.60'], localDataCenter: 'datacenter1' });

// Timer
console.time('seed');
async function seed() {

  await client.connect();
  await client.execute(`CREATE KEYSPACE IF NOT EXISTS ravingz WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1' }`);
  await client.execute(`USE ravingz`);
  await client.execute(`CREATE TABLE IF NOT EXISTS images_by_restaurant (
      imageid int, 
      restaurantid int,
      shardkey int, 
      username varchar, 
      profileurl text, 
      caption text, 
      url text, 
      createdat timestamp, 
      PRIMARY KEY (restaurantid, shardkey, imageid)
    ) WITH CLUSTERING ORDER BY (shardkey DESC, imageid DESC);`);

  // The maximum amount of async executions that are going to be launched in parallel at any given time
  const concurrencyLevel = 20;
  const promises = new Array(concurrencyLevel);

  const info = {
    totalLength: faker.random.number({min: 5, max: 1200}), // 201158
    counter: -1,
    resCounter: 999990,
    resMax: 1000000,
    shardkey: 0
  };

  // Launch in parallel n async operations (n being the concurrency level)
  for (let i = 0; i < concurrencyLevel; i++) {
    promises[i] = executeOneAtATime(info);
  }

  try {
    // The n promises are going to be resolved when all the executions are completed.
    await Promise.all(promises);
    console.timeEnd('seed');
    console.log(`Finished executing ${info.totalLength} queries with a concurrency level of ${concurrencyLevel}.`);

  } finally {

    await client.shutdown();
  }
}

async function executeOneAtATime(info) {
  const query = `INSERT INTO images_by_restaurant (imageid, restaurantid, shardkey, username, profileurl, caption, url, createdat) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const options = { prepare: true, isIdempotent: true };

  while (info.resCounter <= info.resMax) {

    // Execute the queries
    while (info.counter++ < info.totalLength) {
      const createdat = (new Date()).toLocaleDateString();

      if(info.counter % 30 === 0) {
        info.shardkey += 1;
      }

      //commentid varchar, restaurantid varchar, userid varchar, comment text, urls list<text>
      const params = [
        info.counter, 
        info.resCounter,
        info.shardkey,
        faker.name.findName(),  
        `https://i.pravatar.cc/150?img=${faker.random.number({min: 1, max: 70})}`,
        faker.lorem.sentences(3), 
        `https://ravingz.s3-us-west-1.amazonaws.com/${faker.random.number({max: 999, min: 0})}.jpg`, 
        createdat
      ];

      await client.execute(query, params, options);
    }

    info.totalLength = faker.random.number({min: 5, max: 1200});
    info.counter = -1,
    info.resCounter += 1;
    info.shardkey = 0;
  }
}

seed();

// Exit on unhandledRejection
process.on('unhandledRejection', (reason) => { throw reason; });