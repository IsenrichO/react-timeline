'use strict';
const Mongoose = require('mongoose'),
      Schema = Mongoose.Schema;


const PointSchema = new Schema({
  type: {
    type: String,
    default: 'Point'
  },
  coordinates: {
    type: [Number],
    index: '2dsphere'
  }
});

module.exports = PointSchema;
