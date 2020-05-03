const cassandra = require('cassandra-driver');
const NodeCache = require( "node-cache" );
const cache = new NodeCache();

const client = new cassandra.Client({ 
  contactPoints: ['50.18.148.85', '52.8.158.153', '54.177.25.185', '54.177.86.239'],
  localDataCenter: 'dc1'
});

module.exports = {
  client,
  cache
};