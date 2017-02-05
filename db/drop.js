'use strict';
const Express = require('express');
const Mongoose = require('mongoose');

Mongoose.connect('mongodb://localhost:27017/test');
const db = Mongoose.connection;

db.once('open', () => {
  Mongoose.connection.db.dropDatabase(function (err) {
    console.log('db dropped');
    process.exit(0);
  });
});
