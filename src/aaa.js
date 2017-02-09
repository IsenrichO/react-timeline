'use strict';

/* The API controller
   Exports 3 methods:
   * post - Creates a new thread
   * list - Returns a list of threads
   * show - Displays a thread and its posts
*/


// var Thread = require('../models/thread.js');
// var Post = require('../models/post.js');
var Event = require('../db/models/Event');


// General utility function useful as a callback to Mongoose's `.exec()` method
//  that takes two @params:
//  1.) `err` error parameter
//  2.) `data` response value parameter
const handleResponse = (err, data) => {
  if (err) { throw new Error(`Mongo encountered an error!\t${err}`); }
  // res.send(data);
};

// const sendResponse = (res, data) => { res.send(data); };


exports.post = function(req, res) {
  new Thread({title: req.body.title, author: req.body.author}).save();
};

// Perform Mongoose query to find all records that are instances of the Event
//  Model, sort them in reverse chronological order (i.e., newest first),
//  limit the sort to the 20 most recent records and pass the callback handler:
const listEvents = (req, res) => {
  Event
    .find({})
    .sort({ date: 'desc'})
    .limit(20)
    .exec(function(err, docs) {
      res.send(docs);
    });
    // .exec(handleResponse);
};


// Perform
const addEvents = (req, res, next) => {
  const params = req.body;
  Object
    .keys(Event.schema.obj)
    .forEach(datum => { params[datum] = params[datum] || '' });
  new Event(params).save(handleResponse);
};


// Perform
const updateEvents = (req, res, next) => {
  let  paramsToUpdate = [];

  for (var key in req.body) {
    let obj = {};
    obj[key] = req.body[key];
    paramsToUpdate.push(obj);
  }

  Event
    .update(
      { _id: req.params.id },
      ...paramsToUpdate
    )
    .exec(handleResponse);
};


// Perform
const deleteEvents = (req, res, next) => {
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
};


// App.get('/test', (req, res, next) => {
//   console.log('TEST');
//   Event.find({ noteID: '2kk1' }, (err, docs) => {
//     res.send(docs);
//   });
// });


// first locates a thread by title, then locates the replies by thread ID.
exports.show = function(req, res) {
  Thread.findOne({title: req.params.title}, function(error, thread) {
    var posts = Post.find({thread: thread._id}, function(error, posts) {
      res.send([{thread: thread, posts: posts}]);
    });
  })
};


module.exports = {
  addEvents,
  listEvents,
  updateEvents,
  deleteEvents
};