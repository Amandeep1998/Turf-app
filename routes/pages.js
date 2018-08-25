const express = require('express');
var router = express.Router();
//Find Turfs and display in index
var {Turf} = require('./../models/turf');
var {City} = require('./../models/city');
var {Area} = require('./../models/area');
var {Format} = require('./../models/format');


router.get('/', async(req, res) => {
  try {
    var turfs = await Turf.find({});
    var cities = await City.find({});
    var areas = await Area.find({});
    var formats = await Format.find({});

  } catch (e) {
    console.log(e);
    res.sendStaus(400);
  }

  res.render('index', {
    turfs: turfs,
    cities: cities,
    areas: areas,
    formats: formats,
    heading: 'All Turfs'
  });
});

router.get('/searchTurfs', async(req, res) => {
  var city = req.query.city;
  var area = req.query.area;
  var preferedFormat = req.query.preferedFormat;

  try {
    if(preferedFormat == "any") {
      var turfs = await Turf.find({city, area});
    } else {
      var turfs = await Turf.find({city, area, preferedFormat});
    }
    var cities = await City.find({});
    var areas = await Area.find({});
    var formats = await Format.find({});
  } catch (e) {
    console.log(e);
    res.sendStaus(400);
  }
  res.render('index', {
    turfs: turfs,
    cities: cities,
    areas: areas,
    formats: formats,
    heading: `${city} - ${area}`
  });
});

module.exports = router;
