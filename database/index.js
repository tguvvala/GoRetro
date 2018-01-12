const mongoose = require('mongoose');
const UserSchema = require('schemas/Users');
const ListingSchema = require('schemas/Listing');

let url = process.env.MONGODB_URI || 'mongodb://localhost/legoTrader';
mongoose.connect(url, { useMongoClient: true });

let db = mongoose.connection;

db.on('error', () => {
  console.error('Connection error!');
});

db.once('open', () => {
  console.log('Connected!');
});

module.exports.findQuery = (query, callback) => {
  Listing.find(query)
    .sort({ createdAt: -1 })
    .exec(callback);
};
