const bodyParser = require('body-parser');
const express = require('express');
const db = require('../database/index');
const mailer = require('../mailer/mailer');

const port = process.env.PORT || 8080;

const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


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
      console.log('data at server: ', data);
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
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${ port }`);
});
