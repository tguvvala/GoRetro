const mongoose = require('mongoose');
let url = process.env.MONGODB_URI || 'mongodb://localhost/legoTrader';
mongoose.connect(url);

let db = mongoose.connection;

db.on('error', () => {
  console.error('Connection error!');
});

db.once('open', () => {
  console.log('Connected!');
});

let testSchema = mongoose.Schema({
  name: String
});

let Test = mongoose.model('Test', testSchema);

let test1 = new Test({
  name: 'Lego Man!'
});

test1.save((err, doc) => {
  console.log('HERE');
});