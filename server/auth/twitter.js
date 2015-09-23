var User = require('../models/user');
var config = require('../../oauth').twitter;
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var init = require('./init');


