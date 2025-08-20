const AWS = require('aws-sdk');
const config = require('../config');

const s3 = new AWS.S3({
  accessKeyId: config.s3.accessKeyId,
  secretAccessKey: config.s3.secretAccessKey,
  region: config.s3.region,
});

exports.uploadFile = async (buffer, key, mimetype) => {
  return s3.upload({
    Bucket: config.s3.bucket,
    Key: key,
    Body: buffer,
    ContentType: mimetype,
  }).promise();
};

exports.getSignedUrl = (key, expires = 300) => {
  return s3.getSignedUrl('getObject', {
    Bucket: config.s3.bucket,
    Key: key,
    Expires: expires,
  });
};