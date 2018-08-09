const express = require('express');
const fs = require('fs-extra');
var router = express.Router();


var {Turf} = require('./../models/turf');
//Get /turf/:id
router.get('/:id', async(req, res) => {
  var id = req.params.id;
  try {
    var turf = await Turf.findById(id);
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
          galleryImages: galleryImages
        });
      }
  });
})


router.get('/book/:id', async(req, res) => {
  var id = req.params.id;
  try {
    var turf = await Turf.findById(id);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
  var morningTimeArray = [];
  var eveningTimeArray = [];
  var nightTimeArray = [];
  morningTimeArray = turf.morningTimeArray;
  eveningTimeArray = turf.eveningTimeArray;
  nightTimeArray = turf.nightTimeArray;
  res.render('turf_book', {
    turf : turf,
    morningTimeArray: morningTimeArray,
    eveningTimeArray: eveningTimeArray,
    nightTimeArray: nightTimeArray,
    id: id
  });
});

router.post('/book/:id', async(req, res) => {
  var id = req.params.id;
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
      var morningTimeAndPrice = turf.morningTimeArray.filter((mtime) => {
        if(timings.includes(mtime.time)) {
          return mtime;
        }
      });

      var eveningTimeAndPrice = turf.eveningTimeArray.filter((etime) => {
        if(timings.includes(etime.time)) {
          return etime;
        }
      });

      var nightTimeAndPrice = turf.nightTimeArray.filter((ntime) => {
        if(timings.includes(ntime.time)) {
          return ntime;
        }
      });
      var finalTimings = [];
      finalTimings = morningTimeAndPrice.concat(eveningTimeAndPrice, nightTimeAndPrice);
      console.log(finalTimings);
      // console.log(morningTimeAndPrice);
      res.render('checkout', {
        turf: turf,
        timings: timings,
        finalTimings: finalTimings
      });
    }
});
module.exports = router;
