const Express = require('express');
const Mongo = require('mongodb');
const Mongoose = require('mongoose');
const BodyParser = require('body-parser');
const compression = require('compression');
const path = require('path');
const zlib = require('zlib');
const cookieParser = require('cookie-parser');
const Request = require('request');
const Multer = require('multer');
const uuidv4 = require('uuid/v4'); // Generate a v4 (randomized) UUID
const { merge } = require('lodash/fp');

const Event = require('../db/models/Event');
const Photo = require('../db/models/EventPhoto');
const Tag = require('../db/models/EventTag');
const ApI = require('./controllers/EventsController');
const { constructApiEndpoint } = require('./utils');
const seedData = require('../src/constants/json/SeedData.json');

// Configure application secrets:
const DotEnvExpand = require('dotenv-expand');
const appEnv = require('dotenv-safe').load({
  allowEmptyValues: false,
  encoding: 'utf8',
  path: path.resolve(__dirname, '../.env'),
  sample: path.resolve(__dirname, '../.env.example'),
});

DotEnvExpand(appEnv);

const Upload = Multer({ dest: 'uploads/' });

// Invoke Express's `static` middleware for configuring `assets`
// as our default static locale; defaults to serving the index.html
// file location therein.
// App.use(Express.static(path.join(__dirname, 'build')));

/* EXPRESS SERVER SETUP */
const app = Express();

// Invoke the Morgan server-side logging middleware with the standard Apache combined log output:
app.use(require('morgan')('combined'));

// Invoke the BodyParser middleware to allow parsing `application/x-www-form-urlencoded` form data:
app.use(BodyParser.urlencoded({ extended: true }));

// Invoke the `cookie-parser` middleware:
app.use(cookieParser());

// Enable the Node.js server-side (GZip) compression middleware:
const {
  Z_DEFAULT_CHUNK,
  Z_DEFAULT_COMPRESSION,
  Z_DEFAULT_MEMLEVEL,
  Z_DEFAULT_STRATEGY,
  Z_DEFAULT_WINDOWBITS,
} = zlib;
app.use(compression({
  chunkSize: Z_DEFAULT_CHUNK, // 16384, // Equivalent to `zlib.Z_DEFAULT_CHUNK`
  level: Z_DEFAULT_COMPRESSION, // 6, // Equivalent to `zlib.Z_DEFAULT_COMPRESSION`
  memLevel: Z_DEFAULT_MEMLEVEL, // 8, // Equivalent to `zlib.Z_DEFAULT_MEMLEVEL`
  strategy: Z_DEFAULT_STRATEGY,
  threshold: 1024, // Parsed by the `bytes` module to `1KB`
  windowBits: Z_DEFAULT_WINDOWBITS, // => `15`
}));

/* MONGOOSE ORM SETUP */

// Specify ECMAScript2015 Promise object as default Promise library for Mongoose to use.
//  This assignment addresses the Mongoose mpromise library deprecation warning.
Mongoose.Promise = global.Promise;

const { Db, Server } = Mongo;
// const db = new Db('events', new Server('localhost', 27017));
// const db = Mongoose.connection;
Mongoose.set('debug', true);

const { MONGO_CLIENT_CONNECTION_BASE } = (process.env || {});

// Connect to the database:
Mongoose
  .connect(`${MONGO_CLIENT_CONNECTION_BASE}events`, { // `${process.env.MONGO_CLIENT_CONNECTION_BASE}/events`, {
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

      newEvt.photos.push(newPhoto);
      newPhoto.event = newEvt;

      newEvt.tags.push(newTag);
      newTag.event = newEvt;

      Promise.all([newEvt.save(), newPhoto.save(), newTag.save()]);
    });
  });

const eventsRoute = require('./routes/events');
const eventUuidsRoute = require('./routes/eventUuids');
const searchEventsRoute = require('./routes/eventSearch');
const searchEventsAllRoute = require('./routes/eventSearchAll');
const searchStarredEventsRoute = require('./routes/eventSearchStarred');
const photosRoute = require('./routes/photos');
const tagsRoute = require('./routes/tags');

app.use(constructApiEndpoint('events'), eventsRoute);
app.use(constructApiEndpoint('events/edit'), eventUuidsRoute);
app.use(constructApiEndpoint('search'), searchEventsAllRoute);
app.use(constructApiEndpoint('search/recent'), searchEventsRoute);
app.use(constructApiEndpoint('search/starred'), searchStarredEventsRoute);
app.use(constructApiEndpoint('photos'), photosRoute);
app.use(constructApiEndpoint('tags'), tagsRoute);

module.exports = app;
