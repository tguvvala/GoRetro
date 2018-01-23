const mongoose = require('mongoose');


let url = process.env.MONGODB_URI;


// let url = 'mongodb://localhost/voyagelego';

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

let sellerSchema = mongoose.Schema({
  username: String,
  profilePic: String
})

let Listing = mongoose.model('Listing', listingSchema);
let Seller = mongoose.model('Seller', sellerSchema);


Seller.findOne({ username: 'TJ Guvvala' }, (err, user) => {
  if (!user) {
    let TJ = new Seller({
      username: 'TJ Guvvala',
      profilePic: 'https://i.imgur.com/PCBrljm.jpg'
    }).save();
  }
});

Seller.findOne({ username: 'Dan Kelly' }, (err, user) => {
  if (!user) {
    let Dan = new Seller({
      username: 'Dan Kelly',
      profilePic: 'https://i.imgur.com/r6Ieg8f.png'
    }).save();
  }
});

Seller.findOne({ username: 'Peter Wang' }, (err, user) => {
  if (!user) {
    let Peter = new Seller({
      username: 'Peter Wang',
      profilePic: 'https://i.imgur.com/gh6a1Vh.png'
    }).save();
  }
});

Seller.findOne({ username: 'Zay Lee' }, (err, user) => {
  if (!user) {
    let TJ = new Seller({
      username: 'Zay Lee',
      profilePic: 'https://i.imgur.com/iqokiUV.jpg'
    }).save();
  }
});

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

module.exports.findQuery = (query, callback, callbackDos) => {
  Listing.find(query)
    .sort({ createdAt: -1 })
    .exec(callback);
};

module.exports.findSellerInfo = (query, callback) => {
  Seller.find(query)
    .exec(callback);
};

module.exports.findTitle = (query, callback) => {
  console.log('qqq', `/${query.title}/`);
  console.log('hardcoded', '/Poke/');
  Listing.find({title: { "$regex": `${query.title}`, "$options": "i" } }, (err, results) => {
    if (err) {
      console.log('err in database findTitle', err);
      callback(err, null);
    } else {
      console.log('success in findTitle', results);
      callback(null, results);
    }
  });
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
module.exports.Listing = Listing;
module.exports.Seller = Seller;
