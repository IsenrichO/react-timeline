'use strict';
const Mongoose = require('mongoose'),
      Schema = Mongoose.Schema,
      Bcrypt = require('bcrypt-nodejs');


const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide your given name']
  },
  lastName: {
    type: String,
    required: [true, 'Please provide your surname']
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'An email address is required']
  },
  password: {
    type: String,
    required: [true, 'A valid password is required']
  }
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  collection: 'Users'
});

// Encrypt password via `save` hook:
UserSchema.pre('save', function(next) {
  // Retain access to the `User` model as a scoped constant:
  const User = this;

  // Generate a password salt before executing callback:
  Bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }

    // Hash (i.e., encrypt) password using generated salt:
    Bcrypt.hash(User.password, salt, null, (err, hash) => {
      if (err) { return next(err); }

      // Reassign plain-text password to encrypted password:
      User.password = hash;
      next();
    });
  });
});

module.exports = UserSchema;
