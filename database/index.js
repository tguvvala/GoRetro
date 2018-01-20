const mongoose = require('mongoose');

// let url = process.env.MONGODB_URI;



let url = 'mongodb://localhost/voyagelego';



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
  condition: String,
  category: String,
  subCategory: String,
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
    subCategory: listingInfo.subCategory,
    username: listingInfo.username,
    email: listingInfo.email,
    zipCode: listingInfo.zipCode,
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

var FacebookUserSchema = new mongoose.Schema({
  fbId: String,
  displayName: String,
  sessionID: String
});

var User = mongoose.model('fbs', FacebookUserSchema);

const updateOrCreateUser = (query, cb) => {
  User.findOne({ fbId: query.fbId }, (err, user) => {
    if (!user) {
      let newUser = new User({
        displayName: query.displayName,
        sessionID: query.sessionID,
        fbId: query.fbId
      });
      newUser.save(function(err, user) {
        if (err) {
          cb(err, null);
        } else {
          cb(null, user);
        }
        cb(err, user);
      });
    } else {
      user.sessionID = query.sessionID;
      user.save(function(err, user) {
        if (err) {
          cb(err, null);
        } else {
          cb(null, user);
        }
      });
    }
  });
};

const logout = (sessionID, cb) => {
  User.update({ sessionID: sessionID }, { $set: { sessionID: '' }}, cb);
};


module.exports.updateOrCreateUser = updateOrCreateUser;
module.exports.User = User;
module.exports.logout = logout;
