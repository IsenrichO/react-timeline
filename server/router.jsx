'use strict';
const Express = require('express'),
      App = Express(),
      Mongoose = require('mongoose'),
      Path = require('path'),
      PathnameBase = '/api/v1/',
      Request = require('request');

const Event = require('../db/models/Event');

const bodyParser = require('body-parser');

// Invoke Express's `static` middleware for configuring `assets`
//  as our default static locale; defaults to serving the index.html
//  file location therein.
App.use(Express.static(Path.join(__dirname, '../dist')));
App.use( bodyParser.json() );
// Connect to the database:
Mongoose.connect('mongodb://localhost:27017/test');
const db = Mongoose.connection;
Mongoose.set('debug', true);
db.on('error', console.error.bind(console, 'Connection Error:'));

App.get('/api/events/:number', (req, res, next) => {
  const sendResponse = (err, docs) => { res.send(docs); }
  Event.find({}).limit(+req.params.number).sort('-date').exec(sendResponse);
});

App.get('/api/events', (req, res, next) => {
  const sendResponse = (err, docs) => { res.send(docs); }
  Event.find({}).sort('-date').exec(sendResponse);
});

App.post('/api/events', (req, res, next) => {
  const sendResponse = (err, docs) => { res.send(docs); }
  const eventAttributes = Object.keys(Event.schema.obj);
  const handleSave = (err, docs) => {
    if (err) {
      console.error(`Error Save: ${docs}!`);
    } else {
      console.log(`Save Successful: ${docs}`);
      sendResponse(err, docs);
    }
  };
  let params = req.body;
  eventAttributes.forEach( (attr) => { params[attr] = params[attr] || '' } );
  new Event(params).save(handleSave);
});

App.patch('/api/events/:id', (req, res, next) => {
  const sendResponse = (err, docs) => { res.send(docs); }
  const eventAttributes = Object.keys(Event.schema.obj);
  let  paramsToUpdate = [];
  for( var key in req.body ){
    let obj = {};
    obj[key] = req.body[key];
    paramsToUpdate.push(obj);
  }

  const handleUpdate = (err, docs) => {
    if (err) {
      console.error(`Error Not Found`);
    } else {
      console.log(`Update Successful: ${docs}`);
      sendResponse(err, docs);
    }
  };

  Event.update({ _id: req.params.id }, ...paramsToUpdate).exec(handleUpdate);
});

App.delete('/api/events/:id', (req, res, next) => {
  const sendResponse = (err, docs) => { res.send(docs); }
  const handleDelete = (err, docs) => {
    if (err) {
      console.error(`Error: Object Delete Failed`);
    } else {
      console.log(`Delete Successful: ${docs._id}`);
      sendResponse(err, docs);
    }
  };
  Event.findByIdAndRemove(req.params.id, handleDelete);
});

App.get('/test', (req, res, next) => {
  console.log('TEST');
  Event.find({ noteID: "2kk1"}, (err, docs) => {
    res.send(docs);
  });
});

module.exports = App;
