'use strict';
const Passport = require('passport'),
      User = require('../db/models/User'),
      JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;


// JWT Strategy setup options:
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET
};

// Creation of JWT Strategy:
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User
    .findById(payload.sub)
    .then(user => done(null, !!user ? user : false))
    .catch(err => done(err, false));
});

// Instruct Passport to make use of above Strategy:
Passport.use(jwtLogin);
