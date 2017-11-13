const Mongoose = require('mongoose');
const EventPhotoSchema = require('./EventPhotoSchema');
const EventTagSchema = require('./EventTagSchema');
const EventLinkSchema = require('./EventLinkSchema');
const PointSchema = require('./PointSchema');

const { Schema } = Mongoose;

const EventSchema = new Schema({
  archived: Boolean,
  coverImageId: String,
  date: {
    required: [true, 'This event requires a date.'],
    type: Date,
    validate: {
      message: 'A date is required for this event.',
      validator: (date) => date.getTime() <= Date.now(),
    },
  },
  dateModified: Date,
  description: [String],
  eventId: String,
  geometry: PointSchema,
  links: [EventLinkSchema],
  location: String,
  name: {
    required: [true, 'This event requires a name.'],
    type: String,
    validate: {
      message: 'Your event name must be at least 3 characters long.',
      validator: (name) => name.length >= 3,
    },
  },
  numRevisions: Number,
  photos: [{
    ref: 'EventPhoto',
    type: Schema.Types.ObjectId,
  }],
  starred: Boolean,
  tags: [{
    ref: 'EventTag',
    type: Schema.Types.ObjectId,
  }],
  type: String,
  uuid: String,
}, {
  collection: 'EventData',
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

EventSchema
  .virtual('photoCount')
  .get(function() { // eslint-disable-line prefer-arrow-callback
    return this.photos.length;
  });

module.exports = EventSchema;
