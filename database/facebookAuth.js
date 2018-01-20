const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const db = require('./index.js');
const session = require('express-session');


//const MongoStore = require('connect-mongo');
//const config = require('../config.js');


//configure Facebook strategy
passport.use(new FacebookStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: 'http://localhost:8080/auth/facebook/return',
  profileFields: ['id', 'displayName', 'photos', 'email'],
  passReqToCallback: true
},
function(req, accessToken, refreshToken, profile, done) {
  //console.log('REQUEST', req);
  db.generateOrFindUser({ id: profile.id, username: profile.displayName, token: req.sessionID }, function (err, user) {
    return done(err, user);
  });
}
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(userId, done) {
  db.User.findById(userId, done);
});