const mongoose = require('mongoose');

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
