const { Schema } = require('mongoose');

const EventLinkSchema = new Schema({
  linkDescription: String,
  linkUrl: {
    required: [true, 'You must provide a valid URL.'],
    type: String,
  },
});

module.exports = EventLinkSchema;
