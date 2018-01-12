const mongoose = require('mongoose');
const User = require('./schemas/User');

let url = process.env.MONGODB_URI || 'mongodb://localhost/legoTrader';
mongoose.connect(url, { useMongoClient: true });

let db = mongoose.connection;

db.on('error', () => {
  console.error('Connection error!');
});

db.once('open', () => {
  console.log('Connected!');
});

module.exports.userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  fbId: {
    type: String,
    unique: true,
    required: true
  },
  fbAccessToken: {
    type: String,
    unique: true,
    required: true
  }
});

module.exports.User = mongoose.model('User', module.exports.userSchema);

let listingSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
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
  legoSetCode: String,
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
});

let Listing = mongoose.model('Listing', listingSchema);

module.exports.deleteListing = (listingID, callback) => {
  Listing.remove({ ['_id']: listingID });
};

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
