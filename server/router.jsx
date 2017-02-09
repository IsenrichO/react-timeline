'use strict';
const Express = require('express'),
      App = Express(),
      Mongoose = require('mongoose'),
      BodyParser = require('body-parser'),
      Path = require('path'),
      PathnameBase = '/api/v1/',
      // $ = require('jquery'),
      Request = require('request');

const Event = require('../db/models/Event');
const ApI = require('../src/aaa');
const seedData = require('../src/constants/json/SeedData.json');


// Invoke Express's `static` middleware for configuring `assets`
//  as our default static locale; defaults to serving the index.html
//  file location therein.
App.use(Express.static(Path.join(__dirname, '../dist')));
App.use(BodyParser.json());
// Connect to the database:
Mongoose.connect('mongodb://localhost:27017/events');
const db = Mongoose.connection;

Mongoose.set('debug', true);
db.on('error', console.error.bind(console, 'Connection Error:'));

// db.once('open', function(callback) {
//   console.log('LINK OPENED');
//   console.log('# Mongo DB:  Connected to server!');
//   let numSeeds = seedData.length;
//   let done = 0;

//   const handleSave = (err, evt) => {
//     if (err) {
//       console.error(`Error Save: ${evt}!`);
//     } else {
//       console.log(`Save Successful: ${evt.name}`);
//       done++;
//       if (done === numSeeds) { db.close(); }
//     }
//   };

//   seedData.forEach( (event) => {
//     new Event(event).save(handleSave);
//   });
// });
// .on('close',  () => {
//   console.log('Seeding Finished');
// });



App.get('/api/events/:number', (req, res, next) => {
  const sendResponse = (err, docs) => { res.send(docs); }
  Event.find({}).limit(+req.params.number).sort('-date').exec(sendResponse);
});


// App.get('/api/events', (req, res, next) => {
//   const sendResponse = (err, docs) => {
//     console.log('pppp', err, docs);
//     res.send(docs);
//   }

//   Event.find({}).sort('-date').exec(sendResponse);
//   // Event.find({}).exec(sendResponse);

App.get('/api/events', ApI.listEvents);


App.post('/api/events', ApI.addEvents);
  // const sendResponse = (err, docs) => { res.send(docs); }
  // const eventAttributes = Object.keys(Event.schema.obj);
  // const handleSave = (err, docs) => {
  //   if (err) {
  //     console.error(`Error Save: ${docs}!`);
  //   } else {
  //     console.log(`Save Successful: ${docs}`);
  //     sendResponse(err, docs);
  //   }
  // };
  // let params = req.body;
  // console.log('PARAMS:', params);
  // eventAttributes.forEach( (attr) => { params[attr] = params[attr] || '' } );
  // new Event(params).save(handleSave);


App.patch('/api/events/:id', ApI.updateEvents);
  // const sendResponse = (err, docs) => { res.send(docs); }
  // const eventAttributes = Object.keys(Event.schema.obj);
  // let  paramsToUpdate = [];
  // for (var key in req.body) {
  //   let obj = {};
  //   obj[key] = req.body[key];
  //   paramsToUpdate.push(obj);
  // }

  // const handleUpdate = (err, docs) => {
  //   if (err) {
  //     console.error(`Error Not Found`);
  //   } else {
  //     console.log(`Update Successful: ${docs}`);
  //     sendResponse(err, docs);
  //   }
  // };

  // Event.update({ _id: req.params.id }, ...paramsToUpdate).exec(handleUpdate);


App.delete('/api/events/:id', ApI.deleteEvents);
//   const sendResponse = (err, docs) => { res.send(docs); }
//   const handleDelete = (err, docs) => {
//     if (err) {
//       console.error(`Error: Object Delete Failed`);
//     } else {
//       console.log(`Delete Successful: ${docs._id}`);
//       sendResponse(err, docs);
//     }
//   };
//   Event.findByIdAndRemove(req.params.id, handleDelete);
// });

// App.get('/test', (req, res, next) => {
//   console.log('TEST');
//   Event.find({ noteID: '2kk1' }, (err, docs) => {
//     res.send(docs);
//   });


module.exports = App;
