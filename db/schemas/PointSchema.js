const { Schema } = require('mongoose');

const PointSchema = new Schema({
  coordinates: {
    index: '2dsphere',
    type: [Number],
  },
  type: {
    default: 'Point',
    type: String,
  },
});

module.exports = PointSchema;
