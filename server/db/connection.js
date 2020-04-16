const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ 
  contactPoints: [ '54.215.116.117' ],
  localDataCenter: 'datacenter1'
});

module.exports = client;