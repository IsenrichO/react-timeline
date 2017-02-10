'use strict';
const Mongoose = require('mongoose');


// Specify ECMAScript2015 Promise object as default Promise library for Mongoose to use.
//  This assignment addresses the Mongoose mpromise library deprecation warning.
Mongoose.Promise = global.Promise;

// Only ever executed once for entire test suite:
before((done) => {
  Mongoose.connect('mongodb://localhost:27017/test');
  Mongoose.connection
    .on('open', () => {
      console.log('MongoDB connection for testing established.');
      done();
    })
    .on('error', (err) => {
      console.error.call(console, `Connection Error:\t${err}`);
    });
});

// Drop existing database for each (re-)run of tests:
beforeEach((done) => {
  Mongoose.connection.collections.EventData.drop(() => {
    // Ready to run next test:
    done();
  });
});
