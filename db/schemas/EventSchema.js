'use strict';
const Mongoose = require('mongoose'),
      Schema = Mongoose.Schema;
const EventPhotoSchema = require('./EventPhotoSchema'),
      EventTagSchema = require('./EventTagSchema'),
      EventLinkSchema = require('./EventLinkSchema'),
      PointSchema = require('./PointSchema');


const EventSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length >= 3,
      message: 'Your event name must be at least 3 characters long.'
    },
    required: [true, 'This event requires a name.']
  },
  date: {
    type: Date,
    validate: {
      validator: (date) => date.getTime() <= Date.now(),
      message: 'A date is required for this event.'
    },
    required: [true, 'This event requires a date.']
  },
  formattedDate: String,
  uuid: String,
  eventId: String,
  type: String,
  description: String,
  location: String,
  geometry: PointSchema,
  photos: [{
    type: Schema.Types.ObjectId,
    ref: 'EventPhoto'
  }],
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'EventTag'
  }],
  links: [EventLinkSchema],
  starred: Boolean,
  dateModified: Date,
  numRevisions: Number,
  archived: Boolean
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  collection: 'EventData'
});

EventSchema
  .virtual('photoCount')
  .get(function() {
    return this.photos.length;
  });

module.exports = EventSchema;
