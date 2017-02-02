var Mongoose = require('mongoose');

let Schema = Mongoose.Schema;
let EventSchema = new Schema({
  name: String,
  noteID: String,
  type: String,
  description: String,
  location: String,
  date: String
}, {
  collection: 'EventData'
});

const Event = Mongoose.model('Event', EventSchema);

module.exports = Event;
