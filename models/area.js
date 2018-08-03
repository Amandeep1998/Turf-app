const mongoose = require('mongoose');

//AreaSchema
var AreaSchema =  mongoose.Schema({
  areaName: {
    type: String
  },
  cityName: {
    type: String
  }
});

var Area = mongoose.model('Area', AreaSchema);

module.exports = {Area};
