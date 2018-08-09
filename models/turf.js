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
    image: {
      type: String
    },
    morningTimeArray: [{
      time: {
        type: String
      },
      price: {
        type: String
      }
    }],
    eveningTimeArray: [{
      time: {
        type: String
      },
      price: {
        type: String
      }
    }],
    nightTimeArray: [{
      time: {
        type: String
      },
      price: {
        type: String
      }
    }],
});

TurfSchema.methods.saveTimings = function(morningTimeArray, eveningTimeArray, nightTimeArray) {
  var turf = this;

  morningTimeArray.forEach((time) => {
    turf.morningTimeArray.push({time});
  });

  eveningTimeArray.forEach((time) => {
    turf.eveningTimeArray.push({time});
  });

  nightTimeArray.forEach((time) => {
    turf.nightTimeArray.push({time});
  });

  turf.save().catch((e) => {
    console.log(e);
  });
}

TurfSchema.methods.savePrices = function(morningPrices, eveningPrices, nightPrices) {
  var turf = this;

  var morningTimeAndPrice = [];
  var eveningTimeAndPrice = [];
  var nightTimeAndPrice = [];


  var morningTimeArray = turf.morningTimeArray.map((time) => {
    return time.time;
  });
  var eveningTimeArray = turf.eveningTimeArray.map((time) => {
    return time.time;
  });

  var nightTimeArray = turf.nightTimeArray.map((time) => {
    return time.time;
  });

  for (var i = 0; i < morningTimeArray.length; i++) {
    for (var j = i; j <= i; j++) {
      morningTimeAndPrice.push({
        time: morningTimeArray[i],
        price: morningPrices[j]
      });
    }
  }

  for (var i = 0; i < eveningTimeArray.length; i++) {
    for (var j = i; j <= i; j++) {
      eveningTimeAndPrice.push({
        time: eveningTimeArray[i],
        price: eveningPrices[j]
      });
    }
  }

  for (var i = 0; i < nightTimeArray.length; i++) {
    for (var j = i; j <= i; j++) {
      nightTimeAndPrice.push({
        time: nightTimeArray[i],
        price: nightPrices[j]
      });
    }
  }

  turf.morningTimeArray = morningTimeAndPrice;
  console.log(morningTimeAndPrice);
  turf.eveningTimeArray = eveningTimeAndPrice;
  console.log(eveningTimeAndPrice);
  turf.nightTimeArray = nightTimeAndPrice;
  console.log(nightTimeAndPrice);


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
