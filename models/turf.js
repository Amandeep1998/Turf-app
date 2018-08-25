const mongoose = require('mongoose');
var {DaySchema} = require('./day');

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
    day: DaySchema,
    reviews : [{
      name: {
        type: String
      },
      comment: {
        type: String
      }
    }]
});

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
        price: item.cprice,
        available: true
      });
    });

    var array = createArr(eveningTimeArray, eveningPrices);
    turf.day.sunday.eveningTimeArray = [];
    array.forEach((item) => {
      turf.day.sunday.eveningTimeArray.push({
        time: item.ctime,
        price: item.cprice,
        available: true
      });
    });

    var array = createArr(nightTimeArray, nightPrices);
    turf.day.sunday.nightTimeArray = [];
    array.forEach((item) => {
      turf.day.sunday.nightTimeArray.push({
        time: item.ctime,
        price: item.cprice,
        available: true
      });
    });
      break;

     case 'monday':
     var array = createArr(morningTimeArray, morningPrices);
     turf.day.monday.morningTimeArray = [];
     array.forEach((item) => {
       turf.day.monday.morningTimeArray.push({
         time: item.ctime,
         price: item.cprice,
         available: true
       });
     });

     var array = createArr(eveningTimeArray, eveningPrices);
     turf.day.monday.eveningTimeArray = [];
     array.forEach((item) => {
       turf.day.monday.eveningTimeArray.push({
         time: item.ctime,
         price: item.cprice,
         available: true
       });
     });

     var array = createArr(nightTimeArray, nightPrices);
     turf.day.monday.nightTimeArray = [];
     array.forEach((item) => {
       turf.day.monday.nightTimeArray.push({
         time: item.ctime,
         price: item.cprice,
         available: true
       });
     });
       break;

       case 'tuesday':
       var array = createArr(morningTimeArray, morningPrices);
       turf.day.tuesday.morningTimeArray = [];
       array.forEach((item) => {
         turf.day.tuesday.morningTimeArray.push({
           time: item.ctime,
           price: item.cprice,
           available: true
         });
       });

       var array = createArr(eveningTimeArray, eveningPrices);
       turf.day.tuesday.eveningTimeArray = [];
       array.forEach((item) => {
         turf.day.tuesday.eveningTimeArray.push({
           time: item.ctime,
           price: item.cprice,
           available: true
         });
       });

       var array = createArr(nightTimeArray, nightPrices);
       turf.day.tuesday.nightTimeArray = [];
       array.forEach((item) => {
         turf.day.tuesday.nightTimeArray.push({
           time: item.ctime,
           price: item.cprice,
           available: true
         });
       });
         break;

         case 'wednesday':
         var array = createArr(morningTimeArray, morningPrices);
         turf.day.wednesday.morningTimeArray = [];
         array.forEach((item) => {
           turf.day.wednesday.morningTimeArray.push({
             time: item.ctime,
             price: item.cprice,
             available: true
           });
         });

         var array = createArr(eveningTimeArray, eveningPrices);
         turf.day.wednesday.eveningTimeArray = [];
         array.forEach((item) => {
           turf.day.wednesday.eveningTimeArray.push({
             time: item.ctime,
             price: item.cprice,
             available: true
           });
         });

         var array = createArr(nightTimeArray, nightPrices);
         turf.day.wednesday.nightTimeArray = [];
         array.forEach((item) => {
           turf.day.wednesday.nightTimeArray.push({
             time: item.ctime,
             price: item.cprice,
             available: true
           });
         });
           break;

           case 'thursday':
           var array = createArr(morningTimeArray, morningPrices);
           turf.day.thursday.morningTimeArray = [];
           array.forEach((item) => {
             turf.day.thursday.morningTimeArray.push({
               time: item.ctime,
               price: item.cprice,
               available: true
             });
           });

           var array = createArr(eveningTimeArray, eveningPrices);
           turf.day.thursday.eveningTimeArray = [];
           array.forEach((item) => {
             turf.day.thursday.eveningTimeArray.push({
               time: item.ctime,
               price: item.cprice,
               available: true
             });
           });

           var array = createArr(nightTimeArray, nightPrices);
           turf.day.thursday.nightTimeArray = [];
           array.forEach((item) => {
             turf.day.thursday.nightTimeArray.push({
               time: item.ctime,
               price: item.cprice,
               available: true
             });
           });
             break;

             case 'friday':
             var array = createArr(morningTimeArray, morningPrices);
             turf.day.friday.morningTimeArray = [];
             array.forEach((item) => {
               turf.day.friday.morningTimeArray.push({
                 time: item.ctime,
                 price: item.cprice,
                 available: true
               });
             });

             var array = createArr(eveningTimeArray, eveningPrices);
             turf.day.friday.eveningTimeArray = [];
             array.forEach((item) => {
               turf.day.friday.eveningTimeArray.push({
                 time: item.ctime,
                 price: item.cprice,
                 available: true
               });
             });

             var array = createArr(nightTimeArray, nightPrices);
             turf.day.friday.nightTimeArray = [];
             array.forEach((item) => {
               turf.day.friday.nightTimeArray.push({
                 time: item.ctime,
                 price: item.cprice,
                 available: true
               });
             });
               break;

               case 'saturday':
               var array = createArr(morningTimeArray, morningPrices);
               turf.day.saturday.morningTimeArray = [];
               array.forEach((item) => {
                 turf.day.saturday.morningTimeArray.push({
                   time: item.ctime,
                   price: item.cprice,
                   available: true
                 });
               });

               var array = createArr(eveningTimeArray, eveningPrices);
               turf.day.saturday.eveningTimeArray = [];
               array.forEach((item) => {
                 turf.day.saturday.eveningTimeArray.push({
                   time: item.ctime,
                   price: item.cprice,
                   available: true
                 });
               });

               var array = createArr(nightTimeArray, nightPrices);
               turf.day.saturday.nightTimeArray = [];
               array.forEach((item) => {
                 turf.day.saturday.nightTimeArray.push({
                   time: item.ctime,
                   price: item.cprice,
                   available: true
                 });
               });
                 break;
    default:
  }
  turf.save().then(() => {
    console.log(turf.day);
  }).catch((e) => console.log(e));
}

TurfSchema.methods.setNotAvailable = function(finalTimingsAndPrices, day) {
  var turf = this;
  var timings = finalTimingsAndPrices.map((item) => {
    return item.time;
  });

  //tO make the selected timings not available
  switch (day) {
    case 'sunday':
        turf.day.sunday.morningTimeArray.forEach((item) => {
          if(timings.includes(item.time)) {
            item.available = "false";
          }
        });
        turf.day.sunday.eveningTimeArray.forEach((item) => {
          if(timings.includes(item.time)) {
            item.available = "false";
          }
        });
        turf.day.sunday.nightTimeArray.forEach((item) => {
          if(timings.includes(item.time)) {
            item.available = "false";
          }
        });
      break;
    case 'monday':
        turf.day.monday.morningTimeArray.forEach((item) => {
          if(timings.includes(item.time)) {
            item.available = "false";
          }
        });
        turf.day.monday.eveningTimeArray.forEach((item) => {
          if(timings.includes(item.time)) {
            item.available = "false";
          }
        });
        turf.day.monday.nightTimeArray.forEach((item) => {
          if(timings.includes(item.time)) {
            item.available = "false";
          }
        });
      break;
    case 'tuesday':
        turf.day.tuesday.morningTimeArray.forEach((item) => {
          if(timings.includes(item.time)) {
            item.available = "false";
          }
        });
        turf.day.tuesday.eveningTimeArray.forEach((item) => {
          if(timings.includes(item.time)) {
            item.available = "false";
          }
        });
        turf.day.tuesday.nightTimeArray.forEach((item) => {
          if(timings.includes(item.time)) {
            item.available = "false";
          }
        });
      break;
    case 'wednesday':
        turf.day.wednesday.morningTimeArray.forEach((item) => {
          if(timings.includes(item.time)) {
            item.available = "false";
          }
        });
        turf.day.wednesday.eveningTimeArray.forEach((item) => {
          if(timings.includes(item.time)) {
            item.available = "false";
          }
        });
        turf.day.wednesday.nightTimeArray.forEach((item) => {
          if(timings.includes(item.time)) {
            item.available = "false";
          }
        });
      break;
    case 'thursday':
        turf.day.thursday.morningTimeArray.forEach((item) => {
          if(timings.includes(item.time)) {
            item.available = "false";
          }
        });
        turf.day.thursday.eveningTimeArray.forEach((item) => {
          if(timings.includes(item.time)) {
            item.available = "false";
          }
        });
        turf.day.thursday.nightTimeArray.forEach((item) => {
          if(timings.includes(item.time)) {
            item.available = "false";
          }
        });
      break;
    case 'friday':
        turf.day.friday.morningTimeArray.forEach((item) => {
          if(timings.includes(item.time)) {
            item.available = "false";
          }
        });
        turf.day.friday.eveningTimeArray.forEach((item) => {
          if(timings.includes(item.time)) {
            item.available = "false";
          }
        });
        turf.day.friday.nightTimeArray.forEach((item) => {
          if(timings.includes(item.time)) {
            item.available = "false";
          }
        });
      break;
    case 'saturday':
        turf.day.saturday.morningTimeArray.forEach((item) => {
          if(timings.includes(item.time)) {
            item.available = "false";
          }
        });
        turf.day.saturday.eveningTimeArray.forEach((item) => {
          if(timings.includes(item.time)) {
            item.available = "false";
          }
        });
        turf.day.saturday.nightTimeArray.forEach((item) => {
          if(timings.includes(item.time)) {
            item.available = "false";
          }
        });
      break;
    default:
  }
  turf.save().then((turf) => {
  }).catch((e) => {
    console.log(e);
    res.sendStatus(400);
  })
}


TurfSchema.methods.pushReview = function(name, comment) {
  var turf = this;
  turf.reviews.push({name, comment});
  turf.save().then(() => {
  }).catch((e) => {
    res.sendStatus(400);
  })
}

var Turf = mongoose.model('Turf', TurfSchema);
var Day = mongoose.model('Day', DaySchema);

module.exports = {Turf, Day};
