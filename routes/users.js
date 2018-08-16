const express = require('express');
const passport = require('passport');
var router = express.Router();
//Find Turfs and display in index
var {User} = require('./../models/user');


router.get('/signup', async(req, res) => {
  res.render('signup');
});

router.post('/signup', async(req, res) => {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var mobileNumber = req.body.mobileNumber;

  req.checkBody('email', 'Invalid Email').isEmail();
  req.checkBody('password2', 'Password do not match').equals(password);

  var errors = req.validationErrors();

  if(errors) {
    res.render('signup', {
      errors: errors
    });
  }else {
    try {
      var user = await User.findOne({username: username});
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
    if(user) {
      req.flash('danger', 'User Name exist Choose Another');
      res.redirect('/users/signup');
    }else {
      var user = new User({
        username: username,
        email,
        password,
        mobileNumber,
        admin: 0
      });
      user.save().then((user) => {
        console.log(user);
        req.flash('success', 'You have registered successfully');
        res.redirect('/users/login');
      });
    }
  }
});

router.get('/login', (req, res) => {
  if(res.locals.user) {
    res.redirect('/');
  }
  res.render('login');
});

//post login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  if(req.session.cart) {
    delete req.session.cart;
  }
  req.logout();
  req.flash('success', 'You have successfully logged out');
  res.redirect('/users/login');
});
module.exports = router;
