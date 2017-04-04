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
const Photo = require('../db/models/EventPhoto');
const Tag = require ('../db/models/EventTag');
const formatDate = require('./utilities');

// const eventsRoute = require('./routes/events');

const ApI = require('./controllers/EventsController');
const seedData = require('../src/constants/json/SeedData.json');


const App = Express();
const PathnameBase = '/api/v1/';

const Multer = require('multer');
const Upload = Multer({ dest: 'uploads/' });

// Invoke Express's `static` middleware for configuring `assets`
//  as our default static locale; defaults to serving the index.html
//  file location therein.
App.use(Express.static(Path.join(__dirname, '../dist')));
App.use(BodyParser.json());                           // Parses application/json
App.use(BodyParser.urlencoded({ extended: true }));   // Parses application/x-www-form-urlencoded


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
    Mongoose.connection.collections.EventPhotos.drop();
    
    
    seedData.forEach((evt, index) => {
      [evt.formattedDate, evt.uuid, evt.photos, evt.dateModified, evt.starred] =
        [formatDate(evt.date), evt.uuid || UUID(), new Array(), Date.now(), index % 2];
      
      let newEvt = new Event(evt);
      let newPhoto = new Photo({
        title: 'Medium site hero image',
        url: 'https://cdn-images-1.medium.com/max/2000/1*J-jjDviwGUfzka1HX5LG9A.jpeg'
      });
      let newTag = new Tag({
        name: evt.type || 'No Tag'
      });

      // if (/^TEST/.test(evt.uuid)) { }
      newEvt.photos.push(newPhoto);
      newPhoto.event = newEvt;

      newEvt.tags.push(newTag);
      newTag.event = newEvt;
      
      // Event
      //   .findOne({ name: evt.name })
      //   .populate({
      //     path: 'photos',
      //     model: 'EventPhoto'
      //   });
      
      Promise.all([newEvt.save(), newPhoto.save(), newTag.save()]);
    });
  })
  .on('error', (err) => {
    console.error.call(console, `Connection Error:\t${err}`)
  })
  .on('close', () => {
    console.log('Seeding Finished!');
  });

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

// App.use((err, req, res, next) => {
//   res.status(422).send({ error: err.message });
// });


const eventsRoute = require('./routes/events');
const eventUuidsRoute = require('./routes/eventUuids');
const searchEventsRoute = require('./routes/eventSearch');
const searchEventsAllRoute = require('./routes/eventSearchAll');
const searchStarredEventsRoute = require('./routes/eventSearchStarred');
const photosRoute = require('./routes/photos');
const tagsRoute = require('./routes/tags');

App.use('/api/events', eventsRoute);
App.use('/api/events/edit', eventUuidsRoute);
App.use('/api/search', searchEventsAllRoute);
App.use('/api/search/recent', searchEventsRoute);
App.use('/api/search/starred', searchStarredEventsRoute);
App.use('/api/photos', photosRoute);
App.use('/api/tags', tagsRoute);

module.exports = App;
