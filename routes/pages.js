const express = require('express');
var router = express.Router();
//Find Turfs and display in index
var {Turf} = require('./../models/turf');


router.get('/', async(req, res) => {
  var turfs = await Turf.find({});
  res.render('index', {
    turfs: turfs
  });
});

module.exports = router;
