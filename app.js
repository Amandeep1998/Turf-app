const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const passport = require('passport');

const path = require('path');

var moment = require('moment');
var {User} = require('./models/user');


//Connect to database
var config = require('./config/database');

mongoose.connect(config.database, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Database');
});


var app = express();
//Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//set public as default
app.use(express.static(path.join(__dirname, 'public')));

//set global errors
app.locals.errors = null; //to set global errors to null whenevr the page loads *note*



//fileUpload middleware
app.use(fileUpload());
//Body-parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Express-session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}));

//Express -validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  },
  customValidators: {
    isImage: function(value, filename) {
      var extension = (path.extname(filename)).toLowerCase();
        switch (extension) {
          case '.jpg':
            return '.jpg';
          case '.jpeg':
            return '.jpeg';
          case '.png':
            return '.png';
          case '':
            return '.jpg';
          default:
            return false;
        }
    }
  }
}));

//Express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//passport config
var {passportSetup} = require('./config/passport');
passportSetup(passport);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.get('*', (req, res, next) => { //* gets all the get request
  res.locals.user = req.user || null; //req.user is set if the authentication is succeful and it coomes from passport
  next();
});

app.post('*', (req, res, next) => { //* gets all the post request
  res.locals.user = req.user || null; //req.user is set if the authentication is succeful and it coomes from passport
  next();
});

//Set routes
var admin_city = require('./routes/admin_city');
var admin_area = require('./routes/admin_area');
var admin_format = require('./routes/admin_format');
var admin_time = require('./routes/admin_time');
var admin_turfs = require('./routes/admin_turfs');
var admin_available = require('./routes/admin_available');
var users = require('./routes/users');
var turf = require('./routes/turf');
var payment = require('./routes/payment');
var pages  = require('./routes/pages.js');

app.use('/admin/turfs', admin_turfs);
app.use('/admin/city', admin_city);
app.use('/admin/area', admin_area);
app.use('/admin/format', admin_format);
app.use('/admin/available', admin_available);
app.use('/payment', payment);
app.use('/admin/time', admin_time);
app.use('/users', users);
app.use('/turf', turf);
app.use('/', pages);


var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Starting server at port ${port}`);
});

module.exports = {app};
