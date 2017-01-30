'use strict';
const Express = require('express'),
      App = Express(),
      Mongoose = require('mongoose'),
      Path = require('path'),
      PathnameBase = '/api/v1/',
      Request = require('request');


// Invoke Express's `static` middleware for configuring `assets`
//  as our default static locale; defaults to serving the index.html
//  file location therein.
App.use(Express.static(Path.join(__dirname, '../dist')));


// Connect to the database:
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

mongoose.set('debug', true);

db.on('error', console.error.bind(console, 'Connection Error:'));

// db.once('open', function() {
//   // we're connected!
// });
db.once('open', function(callback) {
  console.log('# Mongo DB:  Connected to server!');
});


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
