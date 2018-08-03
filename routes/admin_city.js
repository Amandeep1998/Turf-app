const express = require('express');
var router  = express.Router();

var {City} = require('./../models/city');
//Get /admin/city
router.get('/', (req, res) => {
  City.find({}).then((city) => {
    res.render('admin/city', {
      city: city
    });
  });
});

//Get admin/city/add-city
router.get('/add-city', (req, res) => {
  var cityName = "";
  res.render('admin/add_city', {
    cityName : cityName
  });
});

//Post admin/city/add-city
router.post('/add-city', (req, res) => {
  req.checkBody('cityName', 'City Name must have a value').notEmpty();

  var cityName = req.body.cityName;
  var errors = req.validationErrors();

  if(errors) {
    res.render('admin/add_city', {
      errors: errors,
      cityName: cityName
    });
  } else {
    City.findOne({cityName: cityName}).then((city) => {
      if(city) {
        req.flash('danger', 'City Name Exist Choose Another');
        res.render('admin/add_city', {
          cityName: cityName
        });
      } else {
        var city = new City({
          cityName: cityName
        });
        city.save().then(() => {
          req.flash('success', 'City Name succesfully Added');
          res.redirect('/admin/city');
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
