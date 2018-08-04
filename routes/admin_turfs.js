const express = require('express');
var router  = express.Router();

var {Turf} = require('./../models/turf');
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

//Post /admin/turfs/add-turf
router.post('/add-turf', async(req, res) => {
  req.checkBody('turfName', 'Turf Name must have a value').notEmpty();
  req.checkBody('address', 'Address  must have a value').notEmpty();
  req.checkBody('turfType', 'Turf Type must have a value').notEmpty();
  req.checkBody('groundSize', 'Ground Size must have a value').notEmpty();

  var errors = req.validationErrors();
  var turfName = req.body.turfName;
  var slug = turfName.replace(/\s+/g, '-').toLowerCase();
  var city = req.body.city;
  var area = req.body.area;
  var address = req.body.address;
  var preferedFormat = req.body.preferedFormat;
  var turfType = req.body.turfType;
  var groundSize = req.body.groundSize;
  var summary = req.body.summary;
  var cities = await City.find({});
  var areas = await Area.find({});
  var formats = await Format.find({});

  if(errors) {
    res.render('admin/add_turf', {
      errors: errors,
      turfName,
      address,
      turfType,
      groundSize,
      summary,
      cities,
      areas,
      formats
    });
  } else {
    Turf.findOne({slug: slug}).then((turf) => {
      if(turf) {
        req.flash('danger', 'Turf Name Exist Choose Another');
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
      } else {
        var turf = new Turf({
          turfName,
          slug,
          city,
          area,
          preferedFormat,
          address,
          turfType,
          groundSize,
          summary
        });
        turf.save().then(() => {
          req.flash('success', 'Turf succesfully Added');
          res.redirect('/admin/turfs');
        }).catch((e) => {
          return console.log(e);
        });
      }
    }).catch((e) => {
      console.log(e);
      res.sendStatus(400);
    });
  }
});


module.exports = router;
