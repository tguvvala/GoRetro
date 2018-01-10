var express = require('express');
var db = require('../database/index');
var app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.get('/listings', (req, res) => {
  res.status(200).send('get request at /listings');
});

app.post('/listing', (req, res) => {
  res.status(200).send('post request to listing');
});


var port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App listening on port ${ port }`);
})