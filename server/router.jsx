'use strict';
const Express = require('express'),
      App = Express(),
      Path = require('path'),
      PathnameBase = '/api/v1/',
      Request = require('request');

// App.use((req, res, next) => {
//   req.path === '/'
//     ? next()
//     :
// });


// Invoke Express's `static` middleware for configuring `assets`
//  as our default static locale; defaults to serving the index.html
//  file location therein.
App.use(Express.static(Path.join(__dirname, '../dist')));


// App.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'assets/index.html'));
//     ≡ `${__dirname}/assets/index.html`
// });

// App.get('/notes/:noteID', (req, res, next) => {
//   // console.log('PARAMS:', req.params);
//   // res.send(req.params);
//   res.next();
// });

module.exports = App;
