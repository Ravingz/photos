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
  await client.execute(`CREATE TABLE IF NOT EXISTS restaurants (
    restaurantid int, 
    name varchar, 
    createdat timestamp,
    PRIMARY KEY (restaurantid)
    )`);

  // The maximum amount of async executions that are going to be launched in parallel at any given time
  const concurrencyLevel = 50;
  const promises = new Array(concurrencyLevel);

  //counter 0 -> 1000000 -> ... -> 10000000
  const info = {
    totalLength: 1000000,
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
  const query = `INSERT INTO restaurants (restaurantId, name, createdat) VALUES (?, ?, ?)`;
  const options = { prepare: true, isIdempotent: true };

  // Execute the queries
  while (info.counter++ < info.totalLength) {
    const createdat = (new Date()).toLocaleDateString();
    const params = [ info.counter, faker.company.companyName(), createdat ];
    await client.execute(query, params, options);
  }
}

seed();

// Exit on unhandledRejection
process.on('unhandledRejection', (reason) => { throw reason; });