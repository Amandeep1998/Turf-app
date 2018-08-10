const mongoose = require('mongoose');


//DaySchema
var DaySchema = new mongoose.Schema({
  sunday: {
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
  },
  monday: {
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
  },
  tuesday: {
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
  },
  wednesday: {
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
  },
  thursday: {
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
  },
  friday: {
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
  },
  saturday: {
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
  }
});

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
    day: DaySchema
});


TurfSchema.methods.removeTimings = function() {
  var turf = this;
  turf.morningTimeArray = [];
  turf.eveningTimeArray = [];
  turf.nightTimeArray = [];

  turf.save().catch((e) => {
    console.log(e);
  });
}

TurfSchema.methods.saveTimingsandPrices = function(morningTimeArray, eveningTimeArray, nightTimeArray, morningPrices, eveningPrices, nightPrices, days) {
  var turf = this;

  var createArr = function(array, price) {
    var arr = [];
    for (var i = 0; i < array.length; i++) {
      for (var j = i; j <= i; j++) {
        arr.push({
          ctime: array[i],
          cprice: price[j]
        })
      }
    }
    return arr;
  }


  switch (days) {
    case 'sunday':
    var array = createArr(morningTimeArray, morningPrices);
    turf.day.sunday.morningTimeArray = [];
    array.forEach((item) => {
      turf.day.sunday.morningTimeArray.push({
        time: item.ctime,
        price: item.cprice
      });
    });

    var array = createArr(eveningTimeArray, eveningPrices);
    turf.day.sunday.eveningTimeArray = [];
    array.forEach((item) => {
      turf.day.sunday.eveningTimeArray.push({
        time: item.ctime,
        price: item.cprice
      });
    });

    var array = createArr(nightTimeArray, nightPrices);
    turf.day.sunday.nightTimeArray = [];
    array.forEach((item) => {
      turf.day.sunday.nightTimeArray.push({
        time: item.ctime,
        price: item.cprice
      });
    });
      break;

     case 'monday':
     var array = createArr(morningTimeArray, morningPrices);
     turf.day.monday.morningTimeArray = [];
     array.forEach((item) => {
       turf.day.monday.morningTimeArray.push({
         time: item.ctime,
         price: item.cprice
       });
     });

     var array = createArr(eveningTimeArray, eveningPrices);
     turf.day.monday.eveningTimeArray = [];
     array.forEach((item) => {
       turf.day.monday.eveningTimeArray.push({
         time: item.ctime,
         price: item.cprice
       });
     });

     var array = createArr(nightTimeArray, nightPrices);
     turf.day.monday.nightTimeArray = [];
     array.forEach((item) => {
       turf.day.monday.nightTimeArray.push({
         time: item.ctime,
         price: item.cprice
       });
     });
       break;

       case 'tuesday':
       var array = createArr(morningTimeArray, morningPrices);
       turf.day.tuesday.morningTimeArray = [];
       array.forEach((item) => {
         turf.day.tuesday.morningTimeArray.push({
           time: item.ctime,
           price: item.cprice
         });
       });

       var array = createArr(eveningTimeArray, eveningPrices);
       turf.day.tuesday.eveningTimeArray = [];
       array.forEach((item) => {
         turf.day.tuesday.eveningTimeArray.push({
           time: item.ctime,
           price: item.cprice
         });
       });

       var array = createArr(nightTimeArray, nightPrices);
       turf.day.tuesday.nightTimeArray = [];
       array.forEach((item) => {
         turf.day.tuesday.nightTimeArray.push({
           time: item.ctime,
           price: item.cprice
         });
       });
         break;

         case 'wednesday':
         var array = createArr(morningTimeArray, morningPrices);
         turf.day.wednesday.morningTimeArray = [];
         array.forEach((item) => {
           turf.day.wednesday.morningTimeArray.push({
             time: item.ctime,
             price: item.cprice
           });
         });

         var array = createArr(eveningTimeArray, eveningPrices);
         turf.day.wednesday.eveningTimeArray = [];
         array.forEach((item) => {
           turf.day.wednesday.eveningTimeArray.push({
             time: item.ctime,
             price: item.cprice
           });
         });

         var array = createArr(nightTimeArray, nightPrices);
         turf.day.wednesday.nightTimeArray = [];
         array.forEach((item) => {
           turf.day.wednesday.nightTimeArray.push({
             time: item.ctime,
             price: item.cprice
           });
         });
           break;

           case 'thursday':
           var array = createArr(morningTimeArray, morningPrices);
           turf.day.thursday.morningTimeArray = [];
           array.forEach((item) => {
             turf.day.thursday.morningTimeArray.push({
               time: item.ctime,
               price: item.cprice
             });
           });

           var array = createArr(eveningTimeArray, eveningPrices);
           turf.day.thursday.eveningTimeArray = [];
           array.forEach((item) => {
             turf.day.thursday.eveningTimeArray.push({
               time: item.ctime,
               price: item.cprice
             });
           });

           var array = createArr(nightTimeArray, nightPrices);
           turf.day.thursday.nightTimeArray = [];
           array.forEach((item) => {
             turf.day.thursday.nightTimeArray.push({
               time: item.ctime,
               price: item.cprice
             });
           });
             break;

             case 'friday':
             var array = createArr(morningTimeArray, morningPrices);
             turf.day.friday.morningTimeArray = [];
             array.forEach((item) => {
               turf.day.friday.morningTimeArray.push({
                 time: item.ctime,
                 price: item.cprice
               });
             });

             var array = createArr(eveningTimeArray, eveningPrices);
             turf.day.friday.eveningTimeArray = [];
             array.forEach((item) => {
               turf.day.friday.eveningTimeArray.push({
                 time: item.ctime,
                 price: item.cprice
               });
             });

             var array = createArr(nightTimeArray, nightPrices);
             turf.day.friday.nightTimeArray = [];
             array.forEach((item) => {
               turf.day.friday.nightTimeArray.push({
                 time: item.ctime,
                 price: item.cprice
               });
             });
               break;

               case 'saturday':
               var array = createArr(morningTimeArray, morningPrices);
               turf.day.saturday.morningTimeArray = [];
               array.forEach((item) => {
                 turf.day.saturday.morningTimeArray.push({
                   time: item.ctime,
                   price: item.cprice
                 });
               });

               var array = createArr(eveningTimeArray, eveningPrices);
               turf.day.saturday.eveningTimeArray = [];
               array.forEach((item) => {
                 turf.day.saturday.eveningTimeArray.push({
                   time: item.ctime,
                   price: item.cprice
                 });
               });

               var array = createArr(nightTimeArray, nightPrices);
               turf.day.saturday.nightTimeArray = [];
               array.forEach((item) => {
                 turf.day.saturday.nightTimeArray.push({
                   time: item.ctime,
                   price: item.cprice
                 });
               });
                 break;
    default:
  }
  turf.save().then(() => {
    console.log(turf.day);
  }).catch((e) => console.log(e));
}


///Other data

// TurfSchema.methods.saveTimings = function(morningTimeArray, eveningTimeArray, nightTimeArray) {
//   var turf = this;
//
//   morningTimeArray.forEach((time) => {
//     turf.morningTimeArray.push({time});
//   });
//
//   eveningTimeArray.forEach((time) => {
//     turf.eveningTimeArray.push({time});
//   });
//
//   nightTimeArray.forEach((time) => {
//     turf.nightTimeArray.push({time});
//   });
//
//   turf.save().catch((e) => {
//     console.log(e);
//   });
// }
//
// TurfSchema.methods.savePrices = function(morningPrices, eveningPrices, nightPrices) {
//   var turf = this;
//
//   var morningTimeAndPrice = [];
//   var eveningTimeAndPrice = [];
//   var nightTimeAndPrice = [];
//
//
//   var morningTimeArray = turf.morningTimeArray.map((time) => {
//     return time.time;
//   });
//   var eveningTimeArray = turf.eveningTimeArray.map((time) => {
//     return time.time;
//   });
//
//   var nightTimeArray = turf.nightTimeArray.map((time) => {
//     return time.time;
//   });
//
//   for (var i = 0; i < morningTimeArray.length; i++) {
//     for (var j = i; j <= i; j++) {
//       morningTimeAndPrice.push({
//         time: morningTimeArray[i],
//         price: morningPrices[j]
//       });
//     }
//   }
//
//   for (var i = 0; i < eveningTimeArray.length; i++) {
//     for (var j = i; j <= i; j++) {
//       eveningTimeAndPrice.push({
//         time: eveningTimeArray[i],
//         price: eveningPrices[j]
//       });
//     }
//   }
//
//   for (var i = 0; i < nightTimeArray.length; i++) {
//     for (var j = i; j <= i; j++) {
//       nightTimeAndPrice.push({
//         time: nightTimeArray[i],
//         price: nightPrices[j]
//       });
//     }
//   }
//
//   turf.morningTimeArray = morningTimeAndPrice;
//   console.log(morningTimeAndPrice);
//   turf.eveningTimeArray = eveningTimeAndPrice;
//   console.log(eveningTimeAndPrice);
//   turf.nightTimeArray = nightTimeAndPrice;
//   console.log(nightTimeAndPrice);
//
//
//   turf.save().catch((e) => {
//     console.log(e);
//   });
// }



var Turf = mongoose.model('Turf', TurfSchema);
var Day = mongoose.model('Day', DaySchema);

module.exports = {Turf, Day};
