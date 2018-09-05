const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
//UserSchema
var UserSchema =  mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  admin: [{
    type:  mongoose.Schema.Types.ObjectId
  }]
});

UserSchema.pre('save', function(next) {
  var user = this;
  if(user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.saveTurfIdAsAdminId = function(turfId) {
  var user = this;
  user.admin.push(turfId);
  user.save().then(() => {
  }).catch((e) => {
    console.log(e);
  });
}

UserSchema.methods.deleteAdmin = function(turfId) {
  var user = this;
  var ids = user.admin.filter((id) => {
    return id.toString() !== turfId; //because id was object
  });
  user.admin = ids;
  user.save().then(() => {
  }).catch((e) => {
    console.log(e);
  });
}


var User = mongoose.model('User', UserSchema);

module.exports = {User};
