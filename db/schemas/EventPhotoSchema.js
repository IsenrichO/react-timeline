'use strict';
const Mongoose = require('mongoose'),
      Schema = Mongoose.Schema;


const EventPhotoSchema = new Schema({
  title: {
    type: String,
    validate: {
      validator: (title) => Boolean(title.length),
      message: 'Please provide a title for this image.'
    }
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  },
  url: {
    type: String,
    required: [true, 'This photo requires a URL.']
  },
  dateTaken: Date,
  locationTaken: String,
  isCoverPhoto: Boolean
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  collection: 'EventPhotos'
});

module.exports = EventPhotoSchema;
