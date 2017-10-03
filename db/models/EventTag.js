const Mongoose = require('mongoose');
const EventTagSchema = require('../schemas/EventTagSchema');

const EventTag = Mongoose.model('EventTag', EventTagSchema);
module.exports = EventTag;
