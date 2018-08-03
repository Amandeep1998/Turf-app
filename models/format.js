const mongoose = require('mongoose');

//PreferedFormatSchema
var FormatSchema =  mongoose.Schema({
  format : {
    type: String,
    required: true
  }
});

var Format = mongoose.model('Format', FormatSchema);

module.exports = {Format};
