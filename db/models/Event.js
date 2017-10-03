const Mongoose = require('mongoose');
const EventSchema = require('../schemas/EventSchema');

const Event = Mongoose.model('Event', EventSchema);
module.exports = Event;
