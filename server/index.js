const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index');
const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/listings', (req, res) => {
  res.status(200).send('get request at /listings');
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