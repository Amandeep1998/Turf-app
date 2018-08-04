const express = require('express');
var router  = express.Router();
const moment = require('moment');

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

router.post('/enter-turf-name', async(req, res) =>{
    var morningTimeArray = req.body.morningTimeArray;
    var eveningTimeArray = req.body.eveningTimeArray;
    var nightTimeArray = req.body.nightTimeArray;
    var turfName = req.body.turfName;

    var turf = await Turf.findOne({turfName: turfName});
    turf.saveTimings(morningTimeArray, eveningTimeArray, nightTimeArray);
    req.flash('success', 'Timings successfully added')
    res.send({redirect: '/admin/time'});
});

router.post('/delete-timings', async(req, res) =>{
    var turfName = req.body.turfName;
    var turf = await Turf.findOne({turfName: turfName});
    turf.removeTimings();
    req.flash('success', 'Timings deleted')
    res.send({redirect: '/admin/time'});
});
module.exports = router;
