const express = require('express');
const moment = require('moment');
var router = express.Router();
var paypal = require('paypal-rest-sdk');
var {Turf} = require('./../models/turf');
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AUnWpN80IPMgIrBozyRuk7Pm46Hmfx3QdHUlTxGkqbj2HVNr4x1p5EEfIhX5bBzDoMpAFvUcKJi-UVSk',
  'client_secret': 'EO40Ab6NzJffeVLtI2s5a0N56YV5pU3w5nXIS9YFK3NGQp47eQDVmOXgfSVm43jmu-KoVnxwd0vnVNbc'
});

router.get('/', (req, res) => {
  res.render('payment');
});

router.get('/pay', (req, res) => {
  var cart = req.session.cart;
  var fullUrlSuccess = req.protocol + '://' + req.get('host') + '/payment' + '/success';
  var fullUrlCancel = req.protocol + '://' + req.get('host') + '/payment' + '/cancel';
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": fullUrlSuccess,
        "cancel_url": fullUrlCancel
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": JSON.stringify(cart.turfName),
                "price": JSON.stringify(cart.totalPrice),
                "currency": "INR",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "INR",
            "total": JSON.stringify(cart.totalPrice)
        },
        "description": "Payment for Turf Booking."
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        for (var i = 0; i < payment.links.length; i++) {
          if(payment.links[i].rel === 'approval_url') {
            res.redirect(payment.links[i].href);
          }
        }
    }
});

});

router.get('/success', async(req, res) => {
  var cart = req.session.cart;
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  try {
    var turf = await Turf.findById(cart.turfId);
  } catch (e) {
    res.sendStatus(400);
  }

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "INR",
            "total": JSON.stringify(cart.totalPrice)
        }
    }]
  }
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        turf.setNotAvailable(cart.finalTimingsAndPrices, cart.day);
        res.render('status', {
          paymentMethod: payment.payer.payment_method,
          payerInfoName : payment.payer.payer_info.first_name + ' ' + payment.payer.payer_info.last_name,
          payerInfoEmail:  payment.payer.payer_info.email,
          turfName: cart.turfName,
          finalTimingsAndPrices: cart.finalTimingsAndPrices,
          totalPrice: cart.totalPrice,
          bookedAt: moment(payment.create_time).format("dddd, MMMM Do YYYY, h:mm:ss a"),
        });
    }
  });
});


router.get('/cancel', async(req, res) => {
  var cart = req.session.cart;
  try {
    var turf = await Turf.findById(cart.turfId);
  } catch (e) {
    res.sendStatus(400);
  }
  req.flash('danger', 'Transaction was canceled due to some reasons, Book Again');
  res.render('checkout', {
    turf: turf,
    cart: cart
  });
});

module.exports = router;
