const mongoose = require('mongoose');

// let url = process.env.MONGODB_URI;
let url = 'mongodb://localhost/voyagelego';
console.log('-------------', url);
mongoose.connect(url, { useMongoClient: true });
require('../config/passport');

let db = mongoose.connection;

db.on('error', () => {
  console.error('Connection error!');
});

db.once('open', () => {
  console.log('Connected!');
});

let listingSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  condition: String,
  category: String,
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  legoSetCode: String,
  imageUrl: String,
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
    condition: listingInfo.condition,
    category: listingInfo.category,
    username: listingInfo.username,
    email: listingInfo.email,
    zipCode: listingInfo.zipCode,
    legoSetCode: listingInfo.legoSetCode,
    imageUrl: listingInfo.imageUrl
  }, (err, listing) => {
    callback(err, listing);
  });
};

module.exports.findQuery = (query, callback) => {
  Listing.find(query)
    .sort({ createdAt: -1 })
    .exec(callback);
};
