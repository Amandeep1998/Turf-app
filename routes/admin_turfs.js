const express = require('express');
var router  = express.Router();
const mkdirp = require('mkdirp');
const fs = require('fs-extra');
const resizeImg = require('resize-img');

var {Turf} = require('./../models/turf');
var {City} = require('./../models/city');
var {Area} = require('./../models/area');
var {Format} = require('./../models/format');
//Get /admin/turfs
router.get('/', async(req, res) => {
  try {
    var turfs = await Turf.find({});
    res.render('admin/turfs', {
      turfs : turfs
    });

  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
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
  var imageFile = typeof req.files.image !== "undefined" ? req.files.image.name:"";
  req.checkBody('turfName', 'Turf Name must have a value').notEmpty();
  req.checkBody('address', 'Address  must have a value').notEmpty();
  req.checkBody('image', 'You must upload a image').isImage(imageFile);


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
          summary,
          image: imageFile
        });
        turf.save().then((turf) => {
          mkdirp('public/turf_images/'+turf._id, function(err) {//it is use to make directories
            return console.log(err);
          });
          mkdirp('public/turf_images/'+turf._id + '/gallery', function(err) {//it is use to make directories
            return console.log(err);
          });
          mkdirp('public/turf_images/'+turf._id + '/gallery/thumbs', function(err) {//it is use to make directories
            return console.log(err);
          });

          if(imageFile !== "") {
            var turfImage = req.files.image;
            var path = 'public/turf_images/' + turf._id + '/' + imageFile;
            turfImage.mv(path, function(err) {
              return console.log(err);
            });
          }

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

//Get admin/turfs/edit-turf
router.get('/edit-turf/:id', async(req, res) => {
  var errors;
  if(req.session.errors) {//after posting the errors will be saved in session
    errors = req.session.errors;
  }
  req.session.errors = null;

  var id = req.params.id;
  try {
    var turf = await Turf.findById(id);
    var cities = await City.find({});
    var areas = await Area.find({});
    var formats = await Format.find({});
    if(!turf) {
      res.sendStatus(404);
    }
    var galleryDir = 'public/turf_images/'+ turf._id + '/gallery';
    var galleryImages = null;

    fs.readdir(galleryDir, function(err, files) {
      if(err) {
         console.log(err);
      } else {
        galleryImages = files;

        res.render('admin/edit_turf', {
          turfName: turf.turfName,
          errors: errors,
          selectedCity: turf.city,
          selectedArea: turf.area,
          selectedpreferedFormat: turf.preferedFormat,
          cities: cities,
          areas: areas,
          formats: formats,
          address: turf.address,
          image: turf.image,
          turfType: turf.turfType,
          groundSize: turf.groundSize,
          summary: turf.summary,
          id: turf._id,
          galleryImages: galleryImages
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

//Post /admin/turfs/edit-turf
router.post('/edit-turf/:id', (req, res) => {
  var imageFile = typeof req.files.image !== "undefined" ? req.files.image.name:"";
  req.checkBody('turfName', 'Turf Name must have a value').notEmpty();
  req.checkBody('address', 'Address  must have a value').notEmpty();
  req.checkBody('image', 'You must upload a image').isImage(imageFile);


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
    var pimage = req.body.pimage;
    var id = req.params.id;
  if(errors) {
    req.session.errors = errors;
    res.redirect('/admin/turfs/edit-turf/' + id)
  } else {
    Turf.findOne({slug: slug, _id:{'$ne': id}}).then((t) => {
      if(t) {
        req.flash('danger', 'Turf Name exist Choose Another');
        res.redirect('/admin/turfs/edit-turf/' + id);
      } else {
        Turf.findById(id).then((turf) => {
          if(!turf) {
            console.log('Turf Not Found');
            return res.sendStatus(404);
          }

          turf.turfName = turfName;
          turf.city = city;
          turf.area = area;
          turf.address = address;
          turf.preferedFormat = preferedFormat;
          turf.turfType = turfType;
          turf.groundSize = groundSize;
          turf.summary = summary;
          if(imageFile !== "") {
            turf.image = imageFile
          }

          turf.save().then((turf) => {
            if(imageFile!== "") {
              if(pimage !== "") {
                fs.remove('public/turf_images/'+id + '/' + pimage, function (err) {//this pimage is used as hiden input so that we can remove the current image file saved in product_images
                  if(err) {
                    return console.log(err);
                  }
                });
              }
              var turfImage = req.files.image;
              var path = 'public/turf_images/' + id + '/' + imageFile;
              turfImage.mv(path, function(err) {
                return console.log(err);
              });
            }
            req.flash('success', 'Turf Edited');
            res.redirect('/admin/turfs/edit-turf/'+id);
          });

        }).catch((e) => {
          console.log(e);
          res.sendStatus(400);
        });
      }
    }).catch((e) => {
      console.log(e);
      res.sendStatus(400);
    })
  }
});


//Post turf gallery
router.post('/turf-gallery/:id', (req, res) => {
  var turfImage = req.files.file;
  var id = req.params.id;
  var path = 'public/turf_images/'+id+'/gallery/' + req.files.file.name;
  var thumbsPath = 'public/turf_images/'+id+'/gallery/thumbs/' + req.files.file.name;

  turfImage.mv(path, function(err, files) {
    if(err) {
      return console.log(err);
    }

    resizeImg(fs.readFileSync(path), {width:100, height:100}).then((buf) => {
      fs.writeFileSync(thumbsPath, buf);
    });
  });
  res.sendStatus(200).end();
});

//Get /admin/turfs/delete-turf/:id
router.get('/delete-turf/:id', async(req, res) => {
  var id = req.params.id;
  var path = 'public/turf_images/' + id;
  fs.remove(path, function(err) {
    if(err) {
      console.log(err);
    } else {
     Turf.findByIdAndRemove(id).then(() => {
       req.flash('success', 'Turf Deleted');
       res.redirect('/admin/turfs');
     })
    }
  })
});
//Get Delete image
router.get('/delete-image/:image', (req, res) => {
  var id = req.query.id;
  var image = req.params.image;
  var galleryImage = 'public/turf_images/' + id + '/gallery/' + image;
  var thumbImage = 'public/turf_images/' + id + '/gallery/thumbs/' + image;

  fs.remove(galleryImage, function(err) {
    if(err) {
      return console.log(err);
    } else {
      fs.remove(thumbImage, function(err) {
        if(err) {
          return console.log(err);
        } else {
          req.flash('success', 'Image Deleted');
          res.redirect('/admin/turfs/edit-turf/' + id);
        }
      });
    }
  });
});
module.exports = router;
