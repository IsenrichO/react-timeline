'use strict';
const App = require('./server/app.js'),
      dotenv = require('dotenv').config(),
      Cloudinary = require('cloudinary').v2;


Cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

App.get('*', (req, res) => {
  res.redirect('/');
});

App.listen(process.env.PORT || 3000, () => {
  console.log('PROCESS: \n\n\n', process.env);
  console.log(`
============================================================
  Server is up and running on LocalHost at Port ${PORT}:
            < http://localhost:${PORT}/ >
============================================================`
  );
});
