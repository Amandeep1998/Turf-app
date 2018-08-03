const express = require('express');
var router  = express.Router();

var {City} = require('./../models/city');
var {Area} = require('./../models/area');
var {Format} = require('./../models/format');
//Get /admin/turfs
router.get('/', (req, res) => {
  res.render('admin/turfs');
});

//Get /admin/turfs/add-turf
router.get('/add-turf', async(req, res) => {
  var turfName = "";
  var address = "";
  var turfType = "";
  var groundSize = "";
  var summary = "";
  var cities = await City.find({});
  var areas = await Area.find({});
  var formats = await Format.find({});
  res.render('admin/add_turf', {
    turfName,
    address,
    turfType,
    groundSize,
    summary,
    cities,
    areas,
    formats
  });
});


module.exports = router;
