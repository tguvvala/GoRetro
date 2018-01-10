var express = require('express');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.get('listing', (req, res) => {
  res.status(200).send();
});

var port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App listening on port ${ port }`);
})