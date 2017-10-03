const Mongoose = require('mongoose');
const Bcrypt = require('bcrypt-nodejs');
const UserSchema = require('../schemas/UserSchema');

// const Schema = Mongoose.Schema;
const User = Mongoose.model('User', UserSchema);
module.exports = User;
