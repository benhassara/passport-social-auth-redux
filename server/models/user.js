var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  name: String,
  oauthID: String
});

module.exports = mongoose.model('users', User);
