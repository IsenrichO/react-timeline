// const Mongoose = require('mongoose');
// const SeedData = require('../../src/constants/json/SeedData.json');
// const Event = require('../models/Event');

// Mongoose.connect('mongodb://localhost:27017/events');
// const db = Mongoose.connection;
// db.on('error', console.error.bind(console, 'Connection Error:'));

// db
//   .once('open', function(callback) {
//     console.log('# Mongo DB:  Connected to server!');
//     let [numSeeds, done] = [SeedData.length, 0];

//     const handleSave = (err, evt) => {
//       err
//         ? console.error(`MongoDB encountered an error in saving Seed Data records to the database:\t${err}`)
//         : (
//           console.log(`Seed Data successfully saved to Mongo!\t${evt.name}`),
//           done++,
//           if (done === numSeeds) { db.close(); }
//         );

//       // if (err) {
//       //   console.error(`Error Save: ${evt}!`);
//       // } else {
//       //   console.log(`Save Successful: ${evt.name}`);
//       //   done++;
//       //   if (done === numSeeds) { db.close(); }
//       // }
//     };

//     SeedData.forEach((evt) => { new Event(evt).save(handleSave); });
//   })
//   .on('close',  () => {
//     console.log('Seeding Finished');
//   });
