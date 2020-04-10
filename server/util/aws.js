const AWS = require('aws-sdk');
const config = require('../config.js');

// configuration of the AWS environment
AWS.config.update({
  accessKeyId: `${config.steps.import.key}`,
  secretAccessKey: `${config.steps.import.secret}`,
});

const s3 = new AWS.S3();
