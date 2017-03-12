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
  url: String,
  dateTaken: Date,
  locationTaken: String,
  isCoverPhoto: Boolean,
  photo: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  collection: 'EventPhotos'
});

module.exports = EventPhotoSchema;
