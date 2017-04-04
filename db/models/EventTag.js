'use strict';
const Mongoose = require('mongoose'),
      EventTagSchema = require('../schemas/EventTagSchema');


const EventTag = Mongoose.model('EventTag', EventTagSchema);
module.exports = EventTag;
