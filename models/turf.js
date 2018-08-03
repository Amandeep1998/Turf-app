const mongoose = require('mongoose');

//TurfSchema
var TurfSchema =  mongoose.Schema({
    turfName: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    city: {
    type: String,
    required: true
    },
    area: {
      type: String.
      required: true
    },
    preferedFormat: {
      type: String,
      required: true
    },
    specifications: {
      turfType: {type: String},
      groundSize: {type: String},
      summary: {type: String}
    },
    address: {
      type: String,
      required: true
    },
    morningTimeArray : {
      type: Array
    },
    nightTimeArray : {
      type: Array
    },
    eveningTimeArray: {
      type: Array
    }
});

var Turf = mongoose.model('Turf', TurfSchema);

module.exports = {Turf};
