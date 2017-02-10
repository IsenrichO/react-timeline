'use strict';
const Mongoose = require('mongoose'),
      Schema = Mongoose.Schema;


const EventSchema = new Schema({
  name: String,
  noteID: String,
  type: String,
  description: String,
  location: String,
  date: Date,
  formattedDate: String,
  photos: Array
}, {
  collection: 'EventData'
});

const Event = Mongoose.model('Event', EventSchema);
module.exports = Event;
