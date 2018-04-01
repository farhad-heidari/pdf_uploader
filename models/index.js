var mongoose = require('mongoose');
mongoose.set('debug', true); 
mongoose.connect('mongodb://localhost/pdf-api');

mongoose.Promise = Promise;

module.exports.Pdf = require("./pdf");