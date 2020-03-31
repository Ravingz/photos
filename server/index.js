/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const fs = require('fs');
const config = require('../config.js');
// load database files
const Photo = require('../db/model.js');

const app = express();
const port = 3004;

// configuration of the AWS environment
AWS.config.update({
  accessKeyId: `${config.steps.import.key}`,
  secretAccessKey: `${config.steps.import.secret}`,
});

const s3 = new AWS.S3();

// mongoose instance connection url connection
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const mongoDB = 'mongodb://localhost:27017/seeAllPhotos'; // to access db make sure the socket # is included here
mongoose.connect(mongoDB, options);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));


// import middleware for body parser and json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// to display static file
app.use(express.static(path.join(__dirname, '../public')));

app.get('/seeAllPhotos', (req, res) => {
//   console.log(res.body);
  Photo.find(res.body, (err, photo) => {
    if (err) {
      res.send(err);
    }
    // res.json(photo);
    res.send(photo);
  });
});

app.get('/seeAllPhotos/:photoId', (req, res) => {
  const { photoId } = req.params;
  Photo.findById(photoId, (err, photo) => {
    if (err) {
      res.send(err);
    }
    res.json(photo);
  });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
