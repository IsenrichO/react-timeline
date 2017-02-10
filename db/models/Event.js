'use strict';
const Mongoose = require('mongoose'),
      Schema = Mongoose.Schema;


const EventSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length >= 3,
      message: 'Your event name must be at least 3 characters long.'
    },
    required: [true, 'This event requires a name.']
  },
  noteID: String,
  type: String,
  description: String,
  location: String,
  date: Date,
  formattedDate: String,
  photos: Array,
  photoCount: Number
}, {
  collection: 'EventData'
});

const Event = Mongoose.model('Event', EventSchema);
module.exports = Event;
