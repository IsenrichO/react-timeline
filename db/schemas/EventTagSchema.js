'use strict';
const Mongoose = require('mongoose'),
      Schema = Mongoose.Schema;


const EventTagSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (tag) => !!tag.length,
      message: 'You have not given a name to your tag.'
    },
    required: [true, 'This tag requires a name.']
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  collection: 'EventTags'
});

module.exports = EventTagSchema;
