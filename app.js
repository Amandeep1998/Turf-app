const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const fileUpload = require('express-fileupload');

const path = require('path');

//Connect to database
mongoose.connect('mongodb://localhost:27017/turf-app', { useNewUrlParser: true });
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
  // cookie: { secure: true,
  //   maxAge:60000
  //  }
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


//Set routes
var admin_city = require('./routes/admin_city');
var admin_area = require('./routes/admin_area');
var admin_format = require('./routes/admin_format');
var admin_time = require('./routes/admin_time');
var admin_turfs = require('./routes/admin_turfs');
var pages  = require('./routes/pages.js');


app.use('/admin/turfs', admin_turfs);
app.use('/admin/city', admin_city);
app.use('/admin/area', admin_area);
app.use('/admin/format', admin_format);
app.use('/admin/time', admin_time);
app.use('/', pages);


var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Starting server at port ${port}`);
});
