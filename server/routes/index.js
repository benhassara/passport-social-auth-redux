var express = require('express');
var router = express.Router();
var passport = require('../auth/linkedin');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/auth/linkedin',
  passport.authenticate('linkedin'));

router.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    // auth successful
    res.redirect('/account');
  });

router.get('/login', function(req, res) {
  res.send('Go back and register.');
});

router.get('/account', function(req, res) {
  res.json(req.user);
});

module.exports = router;
