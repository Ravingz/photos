require('newrelic');
const express = require('express');
const path = require('path');
const { client } = require('./db/connection');
const init = require('./db/init')
const app = express();

// Serve static file
app.use(express.static(path.join(__dirname, '../public')));

require('./startup')(app, express)

client.connect((err) => {
  if(err) console.log(err);

  init(client); //initialize db
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log('Connected to Cassandra...')
    console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());
    console.log('Keyspaces: %j', Object.keys(client.metadata.keyspaces));
    console.log(`Listening to PORT ${PORT}`);
  });
});

