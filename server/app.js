const Express = require('express');
const Mongo = require('mongodb');
const Mongoose = require('mongoose');
const BodyParser = require('body-parser');
const Path = require('path');
const Request = require('request');
const Multer = require('multer');
const uuidv4 = require('uuid/v4'); // Generate a v4 (randomized) UUID
const { merge } = require('lodash/fp');

const Event = require('../db/models/Event');
const Photo = require('../db/models/EventPhoto');
const Tag = require('../db/models/EventTag');
// const eventsRoute = require('./routes/events');

const ApI = require('./controllers/EventsController');
const seedData = require('../src/constants/json/SeedData.json');


const App = Express();
const PathnameBase = '/api/v1/';

const Upload = Multer({ dest: 'uploads/' });

// Invoke Express's `static` middleware for configuring `assets`
// as our default static locale; defaults to serving the index.html
// file location therein.
App.use(Express.static(Path.join(__dirname, 'build')));
App.use(BodyParser.json());                         // Parses application/json
App.use(BodyParser.urlencoded({ extended: true })); // Parses application/x-www-form-urlencoded

// Specify ECMAScript2015 Promise object as default Promise library for Mongoose to use.
//  This assignment addresses the Mongoose mpromise library deprecation warning.
Mongoose.Promise = global.Promise;

const [Db, Server] = [Mongo.Db, Mongo.Server];
// const db = new Db('events', new Server('localhost', 27017));
// const db = Mongoose.connection;
Mongoose.set('debug', true);

// Connect to the database:
Mongoose
  .connect('mongodb://localhost:27017/events', {
    useMongoClient: true,
  })
  .on('error', (err) => console.error.bind(console, `Connection Error:\t${err}`))
  .on('close', () => {
    console.info('Seeding Finished!');

    Mongoose.connection.collections.EventData.drop();
    Mongoose.connection.collections.EventPhotos.drop();
    Mongoose.connection.collections.EventTags.drop();
  })
  .once('open', () => {
    Mongoose.connection.collections.EventData.drop();
    Mongoose.connection.collections.EventPhotos.drop();
    Mongoose.connection.collections.EventTags.drop();

    seedData.forEach((evt, index) => {
      const defaultsFallback = {
        coverImageId: null,
        dateModified: Date.now(),
        photos: [],
        starred: index % 2,
        uuid: uuidv4(),
      };
      const { coverImageId, dateModified, photos, starred, uuid } = merge(defaultsFallback, evt);
      const structuredEvent = Object.assign({}, evt, { coverImageId, dateModified, photos, starred, uuid });
      // [evt.uuid, evt.photos, evt.dateModified, evt.starred] = [evt.uuid || UUID(), [], Date.now(), index % 2];

      const newEvt = new Event(structuredEvent);
      const newPhoto = new Photo({
        title: 'Medium site hero image',
        url: 'https://cdn-images-1.medium.com/max/2000/1*J-jjDviwGUfzka1HX5LG9A.jpeg',
      });
      const newTag = new Tag({
        name: evt.type || 'No Tag',
      });

      // if (/^TEST/.test(evt.uuid)) { }
      newEvt.photos.push(newPhoto);
      newPhoto.event = newEvt;

      newEvt.tags.push(newTag);
      newTag.event = newEvt;

      Promise.all([newEvt.save(), newPhoto.save(), newTag.save()]);
    });
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
