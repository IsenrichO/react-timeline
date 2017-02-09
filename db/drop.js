'use strict';
const Express = require('express'),
      Mongoose = require('mongoose');


Mongoose.connect('mongodb://localhost:27017/events');
const db = Mongoose.connection;

db.once('open', () => {
  Mongoose.connection.db.dropDatabase(err => {
    console.log('DB dropped!');
    process.exit(0);
  });
});
