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

let saveListing = (listingInfo) => {

  Listing.create({
    title: listingInfo.title,
    description: listingInfo.description,
    imageUrl: listingInfo.imageUrl,
    category: listingInfo.category,
    location: listingInfo.location,
    email: listingInfo.email
  }, (err, listing) => {
    if (err) {
      return err;
    } else {
      return listing;
    }
  });
};




