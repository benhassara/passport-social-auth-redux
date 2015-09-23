var express = require('express');
var router = express.Router();
var linkedin = require('../auth/linkedin');
var github = require('../auth/github');
var twitter = require('../auth/twitter');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// LinkedIn routes
router.get('/auth/linkedin',
  linkedin.authenticate('linkedin'));

router.get('/auth/linkedin/callback',
  linkedin.authenticate('linkedin', {failureRedirect: '/login'}),
  function(req, res) {
    // auth successful
    res.redirect('/account');
});

// GitHub routes
router.get('/auth/github',
  github.authenticate('github', {scope: ['user:email']}));

router.get('/auth/github/callback',
  github.authenticate('github', {failureRedirect: '/login'}),
  function(req, res) {
    // auth successful
    res.redirect('/account');
});

// Twitter routes
router.get('/auth/twitter', twitter.authenticate('twitter'));

router.get('/auth/twitter/callback',
  twitter.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/account');
  });

router.get('/login', function(req, res) {
  res.send('Go back and register.');
});

router.get('/account', function(req, res) {
  res.json(req.user);
});

module.exports = router;
