const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ 
  contactPoints: [ '13.56.253.60' ],
  localDataCenter: 'datacenter1'
});

module.exports = client;