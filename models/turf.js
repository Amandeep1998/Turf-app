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
      type: String,
      required: true
    },
    preferedFormat: {
      type: String,
      required: true
    },
    turfType: {
      type: String
    },
    groundSize: {
      type: String
    },
    summary: {
      type: String
    },
    address: {
      type: String,
      required: true
    },
    morningTimeArray: [String],
    eveningTimeArray: [String],
    nightTimeArray: [String]

});

TurfSchema.methods.saveTimings = function(morningTimeArray, eveningTimeArray, nightTimeArray) {
  var turf = this;
  turf.morningTimeArray.push(morningTimeArray);
  turf.eveningTimeArray.push(eveningTimeArray);
  turf.nightTimeArray.push(nightTimeArray);
  turf.save().catch((e) => {
    console.log(e);
  });
}

TurfSchema.methods.removeTimings = function() {
  var turf = this;
  turf.morningTimeArray = [];
  turf.eveningTimeArray = [];
  turf.nightTimeArray = [];

  turf.save().catch((e) => {
    console.log(e);
  });
}

var Turf = mongoose.model('Turf', TurfSchema);

module.exports = {Turf};
