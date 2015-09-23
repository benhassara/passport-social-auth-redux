var User = require('../models/user');
var config = require('../../oauth');
var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin');
var init = require('./init');

passport.use(new LinkedInStrategy({
    consumerKey: config.linkedin.clientID,
    consumerSecret: config.linkedin.clientSecret,
    callbackURL: config.linkedin.callbackURL
  },
  function(token, tokenSecret, profile, done) {

    var newUser = new User({
      name: 'bruce wayne',
      oauthID: profile.id
    });
    var searchQuery = {name: profile.displayName};
    var update = {
      name: profile.displayName,
      oauthID: profile.id
    };
    var opts = {upsert: true};

    User.findOneAndUpdate(searchQuery, update, opts, function(err, user){
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
