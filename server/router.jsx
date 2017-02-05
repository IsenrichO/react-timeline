'use strict';
const Express = require('express'),
      App = Express(),
      Mongoose = require('mongoose'),
      Path = require('path'),
      PathnameBase = '/api/v1/',
      Request = require('request');

const Event = require('../db/models/Event');


// Invoke Express's `static` middleware for configuring `assets`
//  as our default static locale; defaults to serving the index.html
//  file location therein.
App.use(Express.static(Path.join(__dirname, '../dist')));

// Connect to the database:
Mongoose.connect('mongodb://localhost:27017/test');
const db = Mongoose.connection;

Mongoose.set('debug', true);

db.on('error', console.error.bind(console, 'Connection Error:'));

App.get('/api/getMostRecentEvents/:number', (req, res, next) => {
  const sendResponse = (err, docs) => { res.send(docs); }
  Event.find({}).limit(+req.params.number).sort('-date').exec(sendResponse);
});

App.get('/test', (req, res, next) => {
  console.log('TEST');
  Event.find({noteID: "2kk1"}, (err, docs) => {
    res.send(docs);
  });
  // console.log(x);
});



// db.once('open', function() {
//   // we're connected!
// });
// db.once('open', function(callback) {
//   console.log('# Mongo DB:  Connected to server!');
//
//   var Fluffster = new UU({ name: 'fluffy' });
//   Fluffster.save((err, uu) => {
//     if (err) { return console.error(`Error Save ${uu}!`); }
//   });
//
//   Mongoose.connection.db.listCollections().toArray(function(err, names) {
//     if (names.length === 0) {
//       console.log('None');
//     }
//     if (err) {
//       console.log(err);
//     }
//     else {
//       names.forEach(function(e, i, a) {
//         Mongoose.connection.db.dropCollection(e.name);
//         console.log("--->>", e.name);
//       });
//     }
//   });
//
//   // Log seed events:
//   Event.find({}, function(error, evts) {
//     // let eventsMap = {};
//     evts.forEach(evt => {
//       // eventsMap[evt._id] = evt;
//       process.stdout.write(evt.id);
//     });
//
//     // eventsMap.forEach( (event) => process.stdout.write(event.toString) );
//   });
// });


module.exports = App;


// App.use((req, res, next) => {
//   req.path === '/'
//     ? next()
//     :
// });

// App.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'assets/index.html'));
//     ≡ `${__dirname}/assets/index.html`
// });

// App.get('/notes/:noteID', (req, res, next) => {
//   // console.log('PARAMS:', req.params);
//   // res.send(req.params);
//   res.next();
// });
