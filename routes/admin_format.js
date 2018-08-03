const express = require('express');
var router  = express.Router();

var {Format} = require('./../models/format');
//Get /admin/turfs/city
router.get('/', (req, res) => {
  Format.find({}).then((formats) => {
    res.render('admin/format', {
      formats: formats
    });
  });
});

//Get admin/format/add-format
router.get('/add-format', (req, res) => {
  var format = "";
  res.render('admin/add_format', {
     format : format
  });
});

//Post admin/format/add-format
router.post('/add-format', (req, res) => {
  req.checkBody('format', 'Format must have a value').notEmpty();

  var formatEntered = req.body.format;
  var errors = req.validationErrors();

  if(errors) {
    res.render('admin/add_format', {
      errors: errors,
      format: formatEntered
    });
  } else {
    Format.findOne({format: formatEntered}).then((formatExist) => {
      if(formatExist) {
        req.flash('danger', 'Format Exist Choose Another');
        res.render('admin/add_format', {
          format: formatEntered
        });
      } else {
        var format = new Format({
          format: formatEntered
        });
        format.save().then(() => {
          req.flash('success', 'Format succesfully Added');
          res.redirect('/admin/format');
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
