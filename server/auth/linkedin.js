var User = require('../models/user');
var config = require('../../oauth');
var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin');

passport.use(new LinkedInStrategy({
    consumerKey: config.linkedin.clientID,
    consumerSecret: config.linkedin.clientSecret,
    callbackURL: config.linkedin.callbackURL
  },
  function(token, tokenSecret, profile, done) {
    console.log(profile);

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

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = passport;
