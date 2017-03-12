'use strict';
const Mongoose = require('mongoose'),
      EventSchema = require('../schemas/EventSchema');


const Event = Mongoose.model('Event', EventSchema);
module.exports = Event;
