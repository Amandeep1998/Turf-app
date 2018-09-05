const express = require('express');
const fs = require('fs-extra');
var router = express.Router();
var moment = require('moment');

var {Turf} = require('./../models/turf');
//Get /turf/:id
router.get('/:id', async(req, res) => {
  var id = req.params.id;
  req.session.getTurfId = id;
  try {
    var turf = await Turf.findById(id);
    var nearByTurf = await Turf.findOne({area: turf.area, turfName: {$ne : turf.turfName}});
    console.log(nearByTurf);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
  var galleryDir = 'public/turf_images/'+ turf._id + '/gallery';
  var galleryImages = null;

    fs.readdir(galleryDir, function(err, files) {
      if(err) {
         console.log(err);
      } else {
        galleryImages = files;
        res.render('turf', {
          turf: turf,
          nearByTurf: nearByTurf,
          galleryImages: galleryImages
        });
      }
  });
})


router.get('/book/:id', async(req, res) => {
  var id = req.params.id;
  var date = moment();
  var fullDate = "";
  var todaysDate = date.format('dddd, MMMM Do YYYY');
  var daysArr = [];
  for(var i = 0; i < 7; i++) {
    if(i == 0) {
      daysArr.push(todaysDate);
    } else {
      date.add(1, 'd');
      var addDate = date.format('dddd, MMMM Do YYYY');
      daysArr.push(addDate);
    }
  }
  try {
    var turf = await Turf.findById(id);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
  var morningTimeArray = [];
  var eveningTimeArray = [];
  var nightTimeArray = [];
  res.render('turf_book', {
    turf : turf,
    morningTimeArray: morningTimeArray,
    eveningTimeArray: eveningTimeArray,
    nightTimeArray: nightTimeArray,
    daysArr: daysArr,
    id: id,
    fullDate: fullDate
  });
});

router.get('/book/:id/:date', async(req, res) => {
  var id = req.params.id;
  var fullDate = req.params.date;
  var splitDay = fullDate.split(',');
  var date = moment();
  var todaysDate = date.format('dddd, MMMM Do YYYY');
  var daysArr = [];
  for(var i = 0; i < 7; i++) {
    if(i == 0) {
      daysArr.push(todaysDate);
    } else {
      date.add(1, 'd');
      var addDate = date.format('dddd, MMMM Do YYYY');
      daysArr.push(addDate);
    }
  }
  try {
    var turf = await Turf.findById(id);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
  var morningTimeArray = [];
  var eveningTimeArray = [];
  var nightTimeArray = [];
  switch (splitDay[0].toLowerCase()) {
    case 'sunday':
      morningTimeArray = turf.day.sunday.morningTimeArray;
      eveningTimeArray = turf.day.sunday.eveningTimeArray;
      nightTimeArray = turf.day.sunday.nightTimeArray;
      break;
      case 'monday':
        morningTimeArray = turf.day.monday.morningTimeArray;
        eveningTimeArray = turf.day.monday.eveningTimeArray;
        nightTimeArray = turf.day.monday.nightTimeArray;
        break;
      case 'tuesday':
        morningTimeArray = turf.day.tuesday.morningTimeArray;
        eveningTimeArray = turf.day.tuesday.eveningTimeArray;
        nightTimeArray = turf.day.tuesday.nightTimeArray;
        break;
      case 'wednesday':
        morningTimeArray = turf.day.wednesday.morningTimeArray;
        eveningTimeArray = turf.day.wednesday.eveningTimeArray;
        nightTimeArray = turf.day.wednesday.nightTimeArray;
        break;
      case 'thursday':
        morningTimeArray = turf.day.thursday.morningTimeArray;
        eveningTimeArray = turf.day.thursday.eveningTimeArray;
        nightTimeArray = turf.day.thursday.nightTimeArray;
        break;
      case 'friday':
        morningTimeArray = turf.day.friday.morningTimeArray;
        eveningTimeArray = turf.day.friday.eveningTimeArray;
        nightTimeArray = turf.day.friday.nightTimeArray;
        break;
      case 'saturday':
        morningTimeArray = turf.day.saturday.morningTimeArray;
        eveningTimeArray = turf.day.saturday.eveningTimeArray;
        nightTimeArray = turf.day.saturday.nightTimeArray;
        break;
    default:

  }

  res.render('turf_book', {
    turf : turf,
    morningTimeArray: morningTimeArray,
    eveningTimeArray: eveningTimeArray,
    nightTimeArray: nightTimeArray,
    daysArr: daysArr,
    id: id,
    fullDate: fullDate,
  });
});

router.post('/book/:id', async(req, res) => {
  var id = req.params.id;
  var dateToDay = req.body.fullDate;
  var fullDate = req.body.fullDate;
  var day = dateToDay.split(',');
  try {
    var turf = await Turf.findById(id);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
  var timings = JSON.parse(req.body.timings);
  var mobileNumber = req.body.mobilenumber;
    if(timings.length < 1 || timings == undefined){
      req.flash('danger', 'Select Timings to Proceed');
      res.redirect('/turf/book/'+ id);
    } else {
      switch (day[0].toLowerCase()) {
        case 'sunday':
            var morningTimeAndPrice = turf.day.sunday.morningTimeArray.filter((mtime) => {
              if(timings.includes(mtime.time)) {
                return mtime;
              }
            });
            var eveningTimeAndPrice = turf.day.sunday.eveningTimeArray.filter((etime) => {
              if(timings.includes(etime.time)) {
                return etime;
              }
            });
            var nightTimeAndPrice = turf.day.sunday.nightTimeArray.filter((ntime) => {
              if(timings.includes(ntime.time)) {
                return ntime;
              }
            });
          break;
        case 'monday':
            var morningTimeAndPrice = turf.day.monday.morningTimeArray.filter((mtime) => {
              if(timings.includes(mtime.time)) {
                return mtime;
              }
            });
            var eveningTimeAndPrice = turf.day.monday.eveningTimeArray.filter((etime) => {
              if(timings.includes(etime.time)) {
                return etime;
              }
            });
            var nightTimeAndPrice = turf.day.monday.nightTimeArray.filter((ntime) => {
              if(timings.includes(ntime.time)) {
                return ntime;
              }
            });
          break;
        case 'tuesday':
            var morningTimeAndPrice = turf.day.tuesday.morningTimeArray.filter((mtime) => {
              if(timings.includes(mtime.time)) {
                return mtime;
              }
            });
            var eveningTimeAndPrice = turf.day.tuesday.eveningTimeArray.filter((etime) => {
              if(timings.includes(etime.time)) {
                return etime;
              }
            });
            var nightTimeAndPrice = turf.day.tuesday.nightTimeArray.filter((ntime) => {
              if(timings.includes(ntime.time)) {
                return ntime;
              }
            });
          break;
        case 'wednesday':
            var morningTimeAndPrice = turf.day.wednesday.morningTimeArray.filter((mtime) => {
              if(timings.includes(mtime.time)) {
                return mtime;
              }
            });
            var eveningTimeAndPrice = turf.day.wednesday.eveningTimeArray.filter((etime) => {
              if(timings.includes(etime.time)) {
                return etime;
              }
            });
            var nightTimeAndPrice = turf.day.wednesday.nightTimeArray.filter((ntime) => {
              if(timings.includes(ntime.time)) {
                return ntime;
              }
            });
          break;
        case 'thursday':
            var morningTimeAndPrice = turf.day.thursday.morningTimeArray.filter((mtime) => {
              if(timings.includes(mtime.time)) {
                return mtime;
              }
            });
            var eveningTimeAndPrice = turf.day.thursday.eveningTimeArray.filter((etime) => {
              if(timings.includes(etime.time)) {
                return etime;
              }
            });
            var nightTimeAndPrice = turf.day.thursday.nightTimeArray.filter((ntime) => {
              if(timings.includes(ntime.time)) {
                return ntime;
              }
            });
                break;
          case 'friday':
              var morningTimeAndPrice = turf.day.friday.morningTimeArray.filter((mtime) => {
                if(timings.includes(mtime.time)) {
                  return mtime;
                }
              });
              var eveningTimeAndPrice = turf.day.friday.eveningTimeArray.filter((etime) => {
                if(timings.includes(etime.time)) {
                  return etime;
                }
              });
              var nightTimeAndPrice = turf.day.friday.nightTimeArray.filter((ntime) => {
                if(timings.includes(ntime.time)) {
                  return ntime;
                }
              });
            break;
          case 'saturday':
              var morningTimeAndPrice = turf.day.saturday.morningTimeArray.filter((mtime) => {
                if(timings.includes(mtime.time)) {
                  return mtime;
                }
              });
              var eveningTimeAndPrice = turf.day.saturday.eveningTimeArray.filter((etime) => {
                if(timings.includes(etime.time)) {
                  return etime;
                }
              });
              var nightTimeAndPrice = turf.day.saturday.nightTimeArray.filter((ntime) => {
                if(timings.includes(ntime.time)) {
                  return ntime;
                }
              });
                break;
        default:
      }
      var finalTimingsAndPrices = [];
      finalTimingsAndPrices = morningTimeAndPrice.concat(eveningTimeAndPrice, nightTimeAndPrice);
      var totalPrice = finalTimingsAndPrices.reduce((sum, current) => {
        return sum + +current.price;
      },0);
      if(req.session.cart) {
        delete req.session.cart;
      }
      req.session.cart = {
        finalTimingsAndPrices: finalTimingsAndPrices,
        fullDate: fullDate,
        day: day[0].toLowerCase(),
        turfName: turf.turfName,
        turfId: turf._id,
        totalPrice: totalPrice
      }
      res.render('checkout', {
        turf: turf,
        cart: req.session.cart
      });
    }
});
//
// router.get('/book-now/:id', async(req, res) => {
//   var id = req.params.id;
//   var cart = req.session.cart;
//   var timings = cart.finalTimingsAndPrices.map((item) => {
//     return item.time;
//   });
//   console.log(cart);
//
//   try {
//     var turf = await Turf.findById(id);
//   } catch (e) {
//     console.log(e);
//     res.sendStatus(400);
//   }
//   //tO make the selected timings not available
//   switch (cart.day) {
//     case 'sunday':
//         turf.day.sunday.morningTimeArray.forEach((item) => {
//           if(timings.includes(item.time)) {
//             item.available = "false";
//           }
//         });
//         turf.day.sunday.eveningTimeArray.forEach((item) => {
//           if(timings.includes(item.time)) {
//             item.available = "false";
//           }
//         });
//         turf.day.sunday.nightTimeArray.forEach((item) => {
//           if(timings.includes(item.time)) {
//             item.available = "false";
//           }
//         });
//       break;
//     case 'monday':
//         turf.day.monday.morningTimeArray.forEach((item) => {
//           if(timings.includes(item.time)) {
//             item.available = "false";
//           }
//         });
//         turf.day.monday.eveningTimeArray.forEach((item) => {
//           if(timings.includes(item.time)) {
//             item.available = "false";
//           }
//         });
//         turf.day.monday.nightTimeArray.forEach((item) => {
//           if(timings.includes(item.time)) {
//             item.available = "false";
//           }
//         });
//       break;
//     case 'tuesday':
//         turf.day.tuesday.morningTimeArray.forEach((item) => {
//           if(timings.includes(item.time)) {
//             item.available = "false";
//           }
//         });
//         turf.day.tuesday.eveningTimeArray.forEach((item) => {
//           if(timings.includes(item.time)) {
//             item.available = "false";
//           }
//         });
//         turf.day.tuesday.nightTimeArray.forEach((item) => {
//           if(timings.includes(item.time)) {
//             item.available = "false";
//           }
//         });
//       break;
//     case 'wednesday':
//         turf.day.wednesday.morningTimeArray.forEach((item) => {
//           if(timings.includes(item.time)) {
//             item.available = "false";
//           }
//         });
//         turf.day.wednesday.eveningTimeArray.forEach((item) => {
//           if(timings.includes(item.time)) {
//             item.available = "false";
//           }
//         });
//         turf.day.wednesday.nightTimeArray.forEach((item) => {
//           if(timings.includes(item.time)) {
//             item.available = "false";
//           }
//         });
//       break;
//     case 'thursday':
//         turf.day.thursday.morningTimeArray.forEach((item) => {
//           if(timings.includes(item.time)) {
//             item.available = "false";
//           }
//         });
//         turf.day.thursday.eveningTimeArray.forEach((item) => {
//           if(timings.includes(item.time)) {
//             item.available = "false";
//           }
//         });
//         turf.day.thursday.nightTimeArray.forEach((item) => {
//           if(timings.includes(item.time)) {
//             item.available = "false";
//           }
//         });
//       break;
//     case 'friday':
//         turf.day.friday.morningTimeArray.forEach((item) => {
//           if(timings.includes(item.time)) {
//             item.available = "false";
//           }
//         });
//         turf.day.friday.eveningTimeArray.forEach((item) => {
//           if(timings.includes(item.time)) {
//             item.available = "false";
//           }
//         });
//         turf.day.friday.nightTimeArray.forEach((item) => {
//           if(timings.includes(item.time)) {
//             item.available = "false";
//           }
//         });
//       break;
//     case 'saturday':
//         turf.day.saturday.morningTimeArray.forEach((item) => {
//           if(timings.includes(item.time)) {
//             item.available = "false";
//           }
//         });
//         turf.day.saturday.eveningTimeArray.forEach((item) => {
//           if(timings.includes(item.time)) {
//             item.available = "false";
//           }
//         });
//         turf.day.saturday.nightTimeArray.forEach((item) => {
//           if(timings.includes(item.time)) {
//             item.available = "false";
//           }
//         });
//       break;
//     default:
//   }
//   turf.save().then((e) => {
//   }).catch((e) => {
//     console.log(e);
//     res.sendStatus(400);
//   })
//   res.end();
//
// });

router.post('/reviews/:id', async(req, res) => {
  var id = req.params.id;
  var userName = req.body.userName;
  var comment =  req.body.comment;
  try {
    var turf = await Turf.findById(id);
  } catch (e) {
    res.sendStatus(400);
  }
  turf.pushReview(userName, comment);
  res.send({userName, comment});
});

module.exports = router;
