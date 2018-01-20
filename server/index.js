const bodyParser = require('body-parser');
const express = require('express');
const db = require('../database/index');
const mailer = require('../mailer/mailer');
const aws = require('aws-sdk');
var passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var Strategy = require('passport-facebook').Strategy;
const User = db.User;
const port = process.env.PORT || 8080;

const url = 'http://localhost:8080';

passport.use(new Strategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: url + '/login/facebook/return',
  passReqToCallback: true
},
function(req, accessToken, refreshToken, profile, done) {
  db.updateOrCreateUser({ fbId: profile.id, displayName: profile.displayName, sessionID: req.sessionID }, function (err, user) {
    return done(err, user);
  });
}
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    if (err) {
      done(err, null);
    } else {
      done(err, user);
    }
  });
});


const app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(require('cookie-parser')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'b12gdh',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/login/facebook', passport.authenticate('facebook'));


app.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/checkSession', (req, res) => {
  User.findOne({ sessionID: req.sessionID }, (err, user) => {
    if (user) {
      res.send({isSignedIn: true, userId: user.fbId, username: user.displayName});
    } else {
      res.send(false);
    }
  });
});

app.get('/logOut', (req, res) => {
  db.logout(req.sessionID, function() {
    res.send(false);
  });
});

const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = 'us-east-2';

app.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

app.get('/listings', (req, res) => {
  let queryTerm = req.query;

  db.findQuery(queryTerm, function(err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(data);
    }
  });

});

app.post('/listings', (req, res) => {
  db.saveListing(req.body, function(err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(data);
    }
  });
});

app.post('/mailer', (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;
  if (name && email && message) {
    mailer.sendMail(name, email, message);
    console.log(name, email, message);
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});


app.listen(port, () => {
  console.log(`App listening on port ${ port }`);
});
