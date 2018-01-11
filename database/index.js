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
  email: String,
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
});

let Listing = mongoose.model('Listing', listingSchema);

module.exports.saveListing = (listingInfo, callback) => {

  Listing.create({
    title: listingInfo.title,
    description: listingInfo.description,
    imageUrl: listingInfo.imageUrl,
    category: listingInfo.category,
    location: listingInfo.location,
    email: listingInfo.email
  }, (err, listing) => {
    if (err) {
      callback(err);
    } else {
      callback(listing);
    }
  });
};

module.exports.findCategory = (category, callback) => {
  Listing.find({
    category: category
  })
    .sort({ createdAt: -1 })
    .exec(callback);
};








