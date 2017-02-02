var Mongoose = require('mongoose');

let Schema = Mongoose.Schema;
let SeedoSchema = new Schema({
  seedKey: Schema.ObjectId,
  name: String,
}, {
  collection: 'InitialData'
});

const UU = Mongoose.model('UU', SeedoSchema);

module.exports = UU;
