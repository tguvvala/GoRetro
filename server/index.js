const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const session = require('express-session');
const db = require('../database/index');
const fbConfig = require('../facebookConfig');
const port = process.env.PORT || 8080;

const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(cookieParser());
app.use(session({
  secret: 'Some Crazy Secret',
  key: 'legos',
  saveUninitialized: true,
  resave: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

let isLoggedIn = (req, res, next) => {
  debugger;
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

passport.use(new FacebookStrategy(
  {
    clientID: fbConfig.clientID,
    clientSecret: fbConfig.clientSecret,
    callbackURL: fbConfig.callbackURL,
    profileFields: fbConfig.profileFields
  }, (accessToken, refreshToken, profile, done) => {
    db.User.findOneAndUpdate(
      { fbId: { $eq: profile.id } },
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
  console.log('HERE SERIALIZE');
  done(null, user);
});

passport.deserializeUser((userObj, done) => {
  console.log('HERE DESERIALIZE');

  done(null, userObj);
});

app.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

app.get('/profile', isLoggedIn, (req, res) => {
  console.log('USER: ', req.user);
  res.render('profile', { user: req.user });
});

app.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}));

app.get('/auth/facebook/callback', passport.authenticate('facebook',
  {
    successRedirect: '/',
    failureRedirect: '/'
  }
));

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

app.listen(port, () => {
  console.log(`App listening on port ${ port }`);
});
