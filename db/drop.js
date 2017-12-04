const Mongoose = require('mongoose');

const db = Mongoose.connection;

Mongoose.connect('mongodb://localhost:27017/events');

db.once('open', () => {
  Mongoose.connection.db.dropDatabase((err) => {
    console.info('Mongo database dropped.');
    process.exit(0);
  });
});
