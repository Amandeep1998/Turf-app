const express = require('express');
var router  = express.Router();
const moment = require('moment');

var {Day} = require('./../models/turf');
var {Turf} = require('./../models/turf');

const {morningTimeArray} = require('./../playground/time.js')
const {eveningTimeArray} = require('./../playground/time.js');
const {nightTimeArray} = require('./../playground/time.js');

router.get('/', async(req, res) => {
  var turfs = await Turf.find({});
  res.render('admin/time', {
    turfs : turfs,
    morningTimeArray : morningTimeArray,
    eveningTimeArray : eveningTimeArray,
    nightTimeArray : nightTimeArray
  });
});



router.post('/post-timings', async(req, res) =>{
    var morningTimeArray = JSON.parse(req.body.morningTimeArray);
    var eveningTimeArray = JSON.parse(req.body.eveningTimeArray);
    var nightTimeArray = JSON.parse(req.body.nightTimeArray);
    var turfName = req.body.turfName;
    var day = req.body.day;

    var turf = await Turf.findOne({turfName: turfName});
    res.render('admin/price', {
        turfName,
        morningTimeArray,
        eveningTimeArray,
        nightTimeArray,
        day
    });
});


router.post('/save', async(req, res) => {
  var morningTimeArray = JSON.parse(req.body.morningTimeArray);
  var eveningTimeArray = JSON.parse(req.body.eveningTimeArray);
  var nightTimeArray = JSON.parse(req.body.nightTimeArray);
  var turfName = req.body.turfName;
  var days = req.body.day;
  var morningPrices = JSON.parse(req.body.morningPrices);
  var eveningPrices = JSON.parse(req.body.eveningPrices);
  var nightPrices = JSON.parse(req.body.nightPrices);
  var turf = await Turf.findOne({turfName: turfName});
  turf.saveTimingsandPrices(morningTimeArray, eveningTimeArray, nightTimeArray, morningPrices, eveningPrices, nightPrices, days);
  res.end();
});
module.exports = router;
