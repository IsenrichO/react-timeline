var Mongoose = require('mongoose');

let Schema = Mongoose.Schema;
let EventSchema = new Schema({
  name: String,
  noteID: String,
  type: String,
  description: String,
  location: String,
  date: Date
}, {
  collection: 'EventData'
});

const Event = Mongoose.model('Event', EventSchema);

// Event.find(function(err, evts) {
//   if (err) { return console.error(err); }
//   console.log('EVENTS:\t', evts);
//   // res.send(evts);
//   return evts;
// });

module.exports = Event;
