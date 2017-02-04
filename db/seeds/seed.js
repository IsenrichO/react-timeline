'use strict';
const Express = require('express');
const Mongoose = require('mongoose');
const seedData = require('./seed_data');
const Event = require('../models/Event');

Mongoose.connect('mongodb://localhost:27017/test');
const db = Mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));


db.once('open', function(callback) {
  console.log('# Mongo DB:  Connected to server!');
  let numSeeds = seedData.length;
  let done = 0;

  const handleSave = (err, evt) => {
    if (err) {
      return console.error(`Error Save: ${evt}!`);
    } else {
      console.log(`Save Successful: ${evt.name}`);
      done++;
      if (done === numSeeds) {db.close();}
    }
  };

  seedData.forEach( (event) => {
    let params = {
      name: event.name,
      noteID: event.noteID,
      type: event.type,
      description: event.description,
      location: event.location,
      date: event.date,
    }

    new Event(params).save(handleSave);
  });


}).on('close',  () => {
  console.log('Seeding Finished');
});
