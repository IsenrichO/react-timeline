'use strict';
const Mongoose = require('mongoose'),
      Schema = Mongoose.Schema,
      EventSchema = require('../schemas/EventSchema');


const Event = Mongoose.model('Event', EventSchema);

module.exports = Event;
