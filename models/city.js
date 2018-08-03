const mongoose = require('mongoose');

//CitySchema
var CitySchema =  mongoose.Schema({
  cityName: {
    type: String,
    required: true,
    trim: true
  }
});

var City = mongoose.model('City', CitySchema);

module.exports = {City};
