const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const session = require('express-session');
const db = require('../database/index');
const fbConfig = require('../facebookConfig');

const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.cookieParser());
app.use(session({ secret: 'Some Crazy Secret', key: 'legos' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

passport.use(new FacebookStrategy(
  {
    clientID: fbConfig.clientID,
    clientSecret: fbConfig.clientSecret,
    callbackURL: fbConfig.callbackURL,
    profileFields: fbConfig.profileFields
  }, (accessToken, refreshToken, profile, done) => {
    console.log('accessToken: ', accessToken);
    console.log('refreshToken: ', refreshToken);
    console.log('profile: ', profile);

    db.User.findOneAndUpdate(
      { fbId: { $eq: done.id } },
      {
        userName: `${ profile.name.givenName } ${ profile.name.familyName }`,
        email: profile.emails[0].value,
        fbId: profile.id,
        fbAccessToken: accessToken
      },
      {
        upsert: true,
        new: true,
        runValidators: true
      }, (err, user) => {
        return done(null, user);
      });
  }));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((userObj, done) => {
  done(null, userObj);
});


app.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}));

app.get('/auth/facebook/callback', passport.authenticate('facebook',
  {
    successRedirect: '/',
    failureRedirect: '/new-listing'
  }));

app.get('/listings', (req, res) => {

  let queryTerm = req.query;
  db.findQuery(queryTerm, function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });

});

app.post('/listing', (req, res) => {
  db.saveListing(req.body, function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App listening on port ${ port }`);
});
