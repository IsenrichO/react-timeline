'use strict';
const Express = require('express'),
      Mongoose = require('mongoose'),
      db = Mongoose.connection;


Mongoose.connect('mongodb://localhost:27017/events');

db.once('open', () => {
  Mongoose.connection.db.dropDatabase((err) => {
    console.log('Mongo database dropped.');
    process.exit(0);
  });
});
