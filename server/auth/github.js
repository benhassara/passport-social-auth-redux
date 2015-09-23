var User = require('../models/user');
var config = require('../../oauth');
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var init = require('./init');

passport.use(new GitHubStrategy({
    clientID: config.github.clientID,
    clientSecret: config.github.clientSecret,
    callbackURL: config.github.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    var newUser = new User({
      name: profile.displayName,
      oauthID: profile.id
    });
    var search = {name: newUser.name};
    var update = {
      name: profile.displayName,
      oauthID: profile.id
    };
    var opts = {upsert: true};

    User.findOneAndUpdate(search, update, opts, function(err, user) {
      if (err) {
        return done(err);
      }
      else {
        return done(null, user);
      }
    });
  }
));

init();

module.exports = passport;
