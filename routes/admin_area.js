const express = require('express');
var router  = express.Router();

var {Area} = require('./../models/area');
var {City} = require('./../models/city');

//Get /admin/area
router.get('/', (req, res) => {
  Area.find({}).then((area) => {
    res.render('admin/area', {
      area: area
    });
  });
});

//Get admin/area/add-area
router.get('/add-area', (req, res) => {
  var areaName = "";
  City.find({}).then((city) => {
    res.render('admin/add_area', {
      areaName : areaName,
      city : city
    });
  }).catch((e) => {
    console.log(e);
  });

});

//Post admin/area/add-area
router.post('/add-area', (req, res) => {
  req.checkBody('areaName', 'Area Name must have a value').notEmpty();

  var areaName = req.body.areaName;
  var cityName = req.body.cityName;

  var errors = req.validationErrors();

  if(errors) {
    res.render('admin/add_area', {
      errors: errors,
      areaName: areaName
    });
  } else {
    Area.findOne({areaName: areaName}).then((area) => {
      if(area) {
        req.flash('danger', 'Area Name Exist Choose Another');
        res.render('admin/add_area', {
          areaName: areaName,
        });
      } else {
        var area = new Area({
          areaName: areaName,
          cityName: cityName
        });

        area.save().then(() => {
          req.flash('success', 'Area Name succesfully Added');
          res.redirect('/admin/area');
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
