const Mongoose = require('mongoose');
const EventPhotoSchema = require('../schemas/EventPhotoSchema');

const EventPhoto = Mongoose.model('EventPhoto', EventPhotoSchema);
module.exports = EventPhoto;
