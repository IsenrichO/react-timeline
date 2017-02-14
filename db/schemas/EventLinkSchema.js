'use strict';
const Mongoose = require('mongoose'),
      Schema = Mongoose.Schema;


const EventLinkSchema = new Schema({
  linkUrl: {
    type: String,
    required: [true, 'You must provide a valid URL.']
  },
  linkDescription: String
});

module.exports = EventLinkSchema;
