'use strict';
const Express = require('express');
const Mongoose = require('mongoose');

Mongoose.connect('mongodb://localhost:27017/test');
const db = Mongoose.connection;
// db.on('error', console.error.bind(console, 'Connection Error:'));


db.once('open', () => {
  Mongoose.connection.db.dropDatabase(function (err) {
    console.log('db dropped');
    process.exit(0);
  });
});

// db.once('open', function(callback) {
//
//
//   Mongoose.connection.db.disconnect();
//
// });
