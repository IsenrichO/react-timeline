'use strict';
const Mongoose = require('mongoose'),
      Schema = Mongoose.Schema,
      Bcrypt = require('bcrypt-nodejs'),
      UserSchema = require('../schemas/UserSchema');


const User = Mongoose.model('User', UserSchema);
module.exports = User;
