'use strict';
const Mongoose = require('mongoose'),
      Schema = Mongoose.Schema;


const EventPhotoSchema = new Schema({
  title: String,
  url: String,
  dateTaken: Date,
  locationTaken: String,
  isCoverPhoto: Boolean
});

module.exports = EventPhotoSchema;
