const express = require('express');
var router  = express.Router();
const moment = require('moment');

var {Day} = require('./../models/turf');
var {Turf} = require('./../models/turf');

router.get('/', async(req, res) => {
  try {
    var turfs = await Turf.find({'_id': req.user.admin});
  } catch (e) {
    res.sendStatus(400);
  }
  res.render('admin/available', {
    turfs: turfs
  })
});

router.post('/search-available', async(req, res) => {
  var turfName = req.body.turfName;
  var day = req.body.day;
  try {
    var turf = await Turf.findOne({turfName: turfName});
  } catch (e) {
    res.sendStatus(400);
  }
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
    day: day,
    turfName: turfName
  });
});

router.get('/change-available/:turfName/:day/:time', async(req, res) => {
  var time = req.params.time;
  var day = req.params.day;
  var turfName = req.params.turfName;

  try {
    var turf = await Turf.findOne({turfName: turfName});
  } catch (e) {
    res.sendStatus(400);
  }

  switch (day) {
    case 'sunday':
       turf.day.sunday.morningTimeArray.forEach((item) => {
         if(item.time == time) {
           item.available = true;
         }
      });
       turf.day.sunday.eveningTimeArray.forEach((item) => {
         if(item.time == time) {
           item.available = true;
         }
      });
       turf.day.sunday.nightTimeArray.forEach((item) => {
         if(item.time == time) {
           item.available = true;
         }
      });
      break;
    case 'monday':
       turf.day.monday.morningTimeArray.forEach((item) => {
         if(item.time == time) {
           item.available = true;
         }
      });
       turf.day.monday.eveningTimeArray.forEach((item) => {
         if(item.time == time) {
           item.available = true;
         }
      });
       turf.day.monday.nightTimeArray.forEach((item) => {
         if(item.time == time) {
           item.available = true;
         }
      });
      break;
    case 'tuesday':
       turf.day.tuesday.morningTimeArray.forEach((item) => {
         if(item.time == time) {
           item.available = true;
         }
      });
       turf.day.tuesday.eveningTimeArray.forEach((item) => {
         if(item.time == time) {
           item.available = true;
         }
      });
       turf.day.tuesday.nightTimeArray.forEach((item) => {
         if(item.time == time) {
           item.available = true;
         }
      });
      break;
    case 'wednesday':
       turf.day.wednesday.morningTimeArray.forEach((item) => {
         if(item.time == time) {
           item.available = true;
         }
      });
       turf.day.wednesday.eveningTimeArray.forEach((item) => {
         if(item.time == time) {
           item.available = true;
         }
      });
       turf.day.wednesday.nightTimeArray.forEach((item) => {
         if(item.time == time) {
           item.available = true;
         }
      });
      break;
    case 'thursday':
       turf.day.thursday.morningTimeArray.forEach((item) => {
         if(item.time == time) {
           item.available = true;
         }
      });
       turf.day.thursday.eveningTimeArray.forEach((item) => {
         if(item.time == time) {
           item.available = true;
         }
      });
       turf.day.thursday.nightTimeArray.forEach((item) => {
         if(item.time == time) {
           item.available = true;
         }
      });
      break;
    case 'friday':
       turf.day.friday.morningTimeArray.forEach((item) => {
         if(item.time == time) {
           item.available = true;
         }
      });
       turf.day.friday.eveningTimeArray.forEach((item) => {
         if(item.time == time) {
           item.available = true;
         }
      });
       turf.day.friday.nightTimeArray.forEach((item) => {
         if(item.time == time) {
           item.available = true;
         }
      });
      break;
    case 'saturday':
       turf.day.saturday.morningTimeArray.forEach((item) => {
         if(item.time == time) {
           item.available = true;
         }
      });
       turf.day.saturday.eveningTimeArray.forEach((item) => {
         if(item.time == time) {
           item.available = true;
         }
      });
       turf.day.saturday.nightTimeArray.forEach((item) => {
         if(item.time == time) {
           item.available = true;
         }
      });
      break;
    }

    turf.save().then(() => {
      res.send({time});
    }).catch((e) => {
      res.sendStatus(400);
    });
});


module.exports = router;
