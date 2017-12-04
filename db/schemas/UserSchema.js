const { Schema } = require('mongoose');
const Bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
  email: {
    lowercase: true,
    required: [true, 'An email address is required'],
    type: String,
    unique: true,
  },
  firstName: {
    required: [true, 'Please provide your given name'],
    type: String,
  },
  lastName: {
    required: [true, 'Please provide your surname'],
    type: String,
  },
  password: {
    required: [true, 'A valid password is required'],
    type: String,
  },
}, {
  collection: 'Users',
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Encrypt password via `save` hook:
UserSchema.pre('save', function(next) {
  // Retain access to the `User` model as a scoped constant:
  const User = this;

  // Generate a password salt before executing callback:
  Bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    // Hash (i.e., encrypt) password using generated salt:
    Bcrypt.hash(User.password, salt, null, (hashErr, hash) => {
      if (hashErr) return next(hashErr);

      // Reassign plain-text password to encrypted password:
      User.password = hash;
      next();
    });
  });
});

module.exports = UserSchema;
