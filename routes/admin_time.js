const express = require('express');
var router  = express.Router();
const moment = require('moment');
const {morningTimeArray} = require('./../playground/time.js');
const {eveningTimeArray} = require('./../playground/time.js');
const {nightTimeArray} = require('./../playground/time.js');

router.get('/', (req, res) => {
  res.render('admin/time', {
    morningTimeArray : morningTimeArray,
    eveningTimeArray : eveningTimeArray,
    nightTimeArray : nightTimeArray
  });
});

module.exports = router;
