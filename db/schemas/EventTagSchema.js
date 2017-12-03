const { Schema } = require('mongoose');

const EventTagSchema = new Schema({
  event: {
    ref: 'Event',
    type: Schema.Types.ObjectId,
  },
  name: {
    required: [true, 'This tag requires a name.'],
    type: String,
    validate: {
      message: 'You have not given a name to your tag.',
      validator: (tag) => !!tag.length,
    },
  },
}, {
  collection: 'EventTags',
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

module.exports = EventTagSchema;
