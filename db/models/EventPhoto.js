'use strict';
const Mongoose = require('mongoose'),
      EventPhotoSchema = require('../schemas/EventPhotoSchema');


const EventPhoto = Mongoose.model('EventPhoto', EventPhotoSchema);
module.exports = EventPhoto;
