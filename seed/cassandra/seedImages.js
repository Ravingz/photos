"use strict";

const faker = require('faker');
const cassandra = require('cassandra-driver');
const Uuid = cassandra.types.Uuid;

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1' });

// Timer
console.time('seed');
async function seed() {

  await client.connect();
  await client.execute(`CREATE KEYSPACE IF NOT EXISTS ravingz WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1' }`);
  await client.execute(`USE ravingz`);
  await client.execute(`CREATE TABLE IF NOT EXISTS images_by_restaurant (
    imageid int, 
    restaurantid int, 
    userid int, 
    comment text, 
    imageurls list<text>, 
    createdat timestamp, 
    updatedat timestamp, 
    PRIMARY KEY (restaurantid, imageid)
    )`);

  // The maximum amount of async executions that are going to be launched in parallel at any given time
  const concurrencyLevel = 60;
  const promises = new Array(concurrencyLevel);

  const info = {
    totalLength: 5000,
    counter: 0
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
  const query = `INSERT INTO images_by_restaurant (imageid, restaurantid, userid, comment, imageurls, createdat, updatedat) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const options = { prepare: true, isIdempotent: true };

  const imageurls = [] // generate this using s3 urls
  // random images
  for(let i = 0; i < faker.random.number({min: 0, max: 3 }); i++) {
    imageurls.push(`https://ravingz.s3-us-west-1.amazonaws.com/${faker.random.number({max: 999, min: 0})}.jpg`);
  }
  
  // Execute the queries
  while (info.counter++ < info.totalLength) {
    const createdat = (new Date()).toLocaleDateString();
    const updatedat = (new Date()).toLocaleDateString();

    //commentid varchar, restaurantid varchar, userid varchar, comment text, urls list<text>
    const params = [info.counter, faker.random.number({min: 9999500, max: 10000000}), faker.random.number({min: 1, max: 1000}), faker.lorem.text(), imageurls, createdat, updatedat ];
    await client.execute(query, params, options);
  }
}

seed();

// Exit on unhandledRejection
process.on('unhandledRejection', (reason) => { throw reason; });