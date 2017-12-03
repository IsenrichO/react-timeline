const { Schema } = require('mongoose');

const EventPhotoSchema = new Schema({
  dateTaken: Date,
  event: {
    ref: 'Event',
    type: Schema.Types.ObjectId,
  },
  isCoverPhoto: Boolean,
  locationTaken: String,
  title: {
    type: String,
    validate: {
      message: 'Please provide a title for this image.',
      validator: (title) => Boolean(title.length),
    },
  },
  url: {
    required: [true, 'This photo requires a URL.'],
    type: String,
  },
}, {
  collection: 'EventPhotos',
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

module.exports = EventPhotoSchema;
