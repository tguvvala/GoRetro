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

let listingSchema = mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  category: String,
  location: String,
  email: String
});

let Listing = mongoose.model('Listing', listingSchema);

let listing1 = new Listing({
  title: "Test",
  description: "Test",
  imageUrl: "Test",
  category: "Test",
  location: "Test",
  email: "Test"
});

listing1.save((err, doc) => {
  console.log('Saved: ', doc);
})



// let testSchema = mongoose.Schema({
//   name: String
// });

// let Test = mongoose.model('Test', testSchema);

// let test1 = new Test({
//   name: 'Lego Man!'
// });

// test1.save((err, doc) => {
//   console.log('HERE');
// });



