const bodyParser = require('body-parser');
const express = require('express');
const db = require('../database/index');
const mailer = require('../mailer/mailer');
const aws = require('aws-sdk');
// const config = require('../config.js');

const port = process.env.PORT || 8080;

const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = 'us-east-2';

app.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

app.get('/listings', (req, res) => {
  let queryTerm = req.query;

  db.findQuery(queryTerm, function(err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(data);
    }
  });

});

app.post('/listings', (req, res) => {
  db.saveListing(req.body, function(err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(data);
    }
  });
});

app.post('/mailer', (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;
  if (name && email && message) {
    mailer.sendMail(name, email, message);
    console.log(name, email, message);
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});


app.listen(port, () => {
  console.log(`App listening on port ${ port }`);
});
