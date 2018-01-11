const mongoose = require('mongoose');
let url = process.env.MONGODB_URI || 'mongodb://localhost/legoTrader';
mongoose.connect(url, { useMongoClient: true });

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
  imageUrl: String,
  category: String,
  location: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
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
    callback(err, listing);
  });
};

module.exports.findQuery = (query, callback) => {
  Listing.find(query)
    .sort({ createdAt: -1 })
    .exec(callback);
};










