const express = require('express');
var router  = express.Router();
const moment = require('moment');

var {Day} = require('./../models/turf');
var {Turf} = require('./../models/turf');

router.get('/', async(req, res) => {
  var turfs = await Turf.find({});
  res.render('admin/available', {
    turfs: turfs
  })
});

router.post('/search-available', async(req, res) => {
  var turfName = req.body.turfName;
  var day = req.body.day;
  var turf = await Turf.findOne({turfName: turfName});
  var times = [];
  switch (day) {
    case 'sunday':
       turf.day.sunday.morningTimeArray.forEach((item) => {
        if(!item.available) {
        times.push(item.time);
        }
      });
       turf.day.sunday.eveningTimeArray.forEach((item) => {
        if(!item.available) {
        times.push(item.time);
        }
      });
       turf.day.sunday.nightTimeArray.forEach((item) => {
        if(!item.available) {
        times.push(item.time);
        }
      });
      break;
    case 'monday':
       turf.day.monday.morningTimeArray.forEach((item) => {
        if(!item.available) {
        times.push(item.time);
        }
      });
       turf.day.monday.eveningTimeArray.forEach((item) => {
        if(!item.available) {
        times.push(item.time);
        }
      });
       turf.day.monday.nightTimeArray.forEach((item) => {
        if(!item.available) {
        times.push(item.time);
        }
      });
      break;
    case 'tuesday':
       turf.day.tuesday.morningTimeArray.forEach((item) => {
        if(!item.available) {
        times.push(item.time);
        }
      });
       turf.day.tuesday.eveningTimeArray.forEach((item) => {
        if(!item.available) {
        times.push(item.time);
        }
      });
       turf.day.tuesday.nightTimeArray.forEach((item) => {
        if(!item.available) {
        times.push(item.time);
        }
      });
      break;
    case 'wednesday':
       turf.day.wednesday.morningTimeArray.forEach((item) => {
        if(!item.available) {
        times.push(item.time);
        }
      });
       turf.day.wednesday.eveningTimeArray.forEach((item) => {
        if(!item.available) {
        times.push(item.time);
        }
      });
       turf.day.wednesday.nightTimeArray.forEach((item) => {
        if(!item.available) {
        times.push(item.time);
        }
      });
      break;
    case 'thursday':
       turf.day.thursday.morningTimeArray.forEach((item) => {
        if(!item.available) {
        times.push(item.time);
        }
      });
       turf.day.thursday.eveningTimeArray.forEach((item) => {
        if(!item.available) {
        times.push(item.time);
        }
      });
       turf.day.thursday.nightTimeArray.forEach((item) => {
        if(!item.available) {
        times.push(item.time);
        }
      });
      break;
    case 'friday':
       turf.day.friday.morningTimeArray.forEach((item) => {
        if(!item.available) {
        times.push(item.time);
        }
      });
       turf.day.friday.eveningTimeArray.forEach((item) => {
        if(!item.available) {
        times.push(item.time);
        }
      });
       turf.day.friday.nightTimeArray.forEach((item) => {
        if(!item.available) {
        times.push(item.time);
        }
      });
      break;
    case 'saturday':
       turf.day.saturday.morningTimeArray.forEach((item) => {
        if(!item.available) {
        times.push(item.time);
        }
      });
       turf.day.saturday.eveningTimeArray.forEach((item) => {
        if(!item.available) {
        times.push(item.time);
        }
      });
       turf.day.saturday.nightTimeArray.forEach((item) => {
        if(!item.available) {
        times.push(item.time);
        }
      });
      break;
    default:

  }

  res.render('admin/change_available', {
    times: times,
  });
});

router.get('/change-available/:time', (req, res) => {
  var time = req.params.time;

});


module.exports = router;
