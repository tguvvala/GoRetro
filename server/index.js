const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database/index');
const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/listings', (req, res) => {

  let queryTerm = req.query;
  db.findQuery(queryTerm, function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200).json(data);
    }
  });

});

app.post('/listing', (req, res) => {
  db.saveListing(req.body, function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App listening on port ${ port }`);
});
