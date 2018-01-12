const bodyParser = require('body-parser');
const express = require('express');
const db = require('../database/index');
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
      res.sendStatus(500);
    } else {
      res.json(data);
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

app.listen(port, () => {
  console.log(`App listening on port ${ port }`);
});
