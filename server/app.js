'use strict';
const Express = require('express'),
      Mongo = require('mongodb');
const Mongoose = require('mongoose'),
      BodyParser = require('body-parser'),
      Path = require('path'),
      Request = require('request'),
      UUID = require('uuid/v4');   // Generate a v4 (randomized) UUID
      // $ = require('jquery'),

const Event = require('../db/models/Event');
const formatDate = require('./utilities');

// const eventsRoute = require('./routes/events');

const ApI = require('./controllers/EventsController');
const seedData = require('../src/constants/json/SeedData.json');


const App = Express();
const PathnameBase = '/api/v1/';

// Invoke Express's `static` middleware for configuring `assets`
//  as our default static locale; defaults to serving the index.html
//  file location therein.
App.use(Express.static(Path.join(__dirname, '../dist')));
App.use(BodyParser.json());
App.use(BodyParser.urlencoded({ extended: true }));


// Specify ECMAScript2015 Promise object as default Promise library for Mongoose to use.
//  This assignment addresses the Mongoose mpromise library deprecation warning.
Mongoose.Promise = global.Promise;

const [Db, Server] = [Mongo.Db, Mongo.Server];
// Connect to the database:
// const db = new Db('events', new Server('localhost', 27017));
Mongoose.connect('mongodb://localhost:27017/events');
const db = Mongoose.connection;
Mongoose.set('debug', true);

db
  .once('open', () => {
    Mongoose.connection.collections.EventData.drop();
    seedData.forEach((evt) => {
      [evt.formattedDate, evt.uuid, evt.photos] = [formatDate(evt.date), UUID(), new Array()];
      new Event(evt).save();
    });
  })
  .on('error', (err) => {
    console.error.call(console, `Connection Error:\t${err}`)
  })
  .on('close', () => {
    console.log('Seeding Finished!');
  });



// App.get('/api/events/:id', (req, res, next) => {
//   const sendResponse = (err, docs) => { res.send(docs); }
//   Event
//     .find({})
//     .limit(+req.params.id)
//     .sort('-date')
//     .exec(sendResponse);
// });


// App
//   .route('/api/events')
//   .get(ApI.listEvents)
//   .post(ApI.addEvents);

// App
//   .route('/api/events/edit/:id')
//   // .get()
//   .put(ApI.updateEvents)
//   .delete(ApI.deleteEvents);



  // App.get('/api/events', (req, res, next) => {
  //   const sendResponse = (err, docs) => {
  //     console.log('pppp', err, docs);
  //     res.send(docs);
  //   }

  //   Event.find({}).sort('-date').exec(sendResponse);
  //   // Event.find({}).exec(sendResponse);
// App.get('/api/events', ApI.listEvents);


// App.post('/api/events', ApI.addEvents);
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


// .put or .patch
// App.put('/api/events/edit/:id', ApI.updateEvents);
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


  // App.delete('/api/events/edit/:id', ApI.deleteEvents);
// App.delete('/api/events/edit/:id', ApI.deleteEvents);

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
  //   Event.find({ eventId: '2kk1' }, (err, docs) => {
  //     res.send(docs);
  //   });


// App.use((err, req, res, next) => {
//   res.status(422).send({ error: err.message });
// });


const eventsRoute = require('./routes/events');
const eventUuidsRoute = require('./routes/eventUuids');
const searchEventsRoute = require('./routes/eventSearch');
const searchStarredEventsRoute = require('./routes/eventSearchStarred');

App.use('/api/events', eventsRoute);
App.use('/api/events/edit', eventUuidsRoute);
App.use('/api/search/recent', searchEventsRoute);
App.use('/api/search/starred', searchStarredEventsRoute);

module.exports = App;
