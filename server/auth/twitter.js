var User = require('../models/user');
var config = require('../../oauth').twitter;
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var init = require('./init');

passport.use(new TwitterStrategy({
    consumerKey: config.clientID,
    consumerSecret: config.clientSecret,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    var newUser = new User({
      name: profile.username,
      oauthID: profile.id
    });
    var search = {name: newUser.name};
    var opts = {upsert: true};
    var update = {name: newUser.name, oauthID: newUser.oauthID};

    User.findOneAndUpdate(search, update, opts, function(err, user) {
      if (err)
        return done(err);
      else
        return done(null, user);
    });
  }
));

init();

module.exports = passport;
