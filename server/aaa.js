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
    .exec((err, records) => {
      res.send(records);
    });
    // .exec(handleResponse);
};

const getTLRange = (req, res) => {
  const minQuery = Event
    .find({})
    .sort({ date: 1 })
    .limit(1)
    .then(evts => evts[0].date);

  const maxQuery = Event
    .find({})
    .sort({ date: -1 })
    .limit(1)
    .then(evts => evts[0].date);

  return Promise
    .all([minQuery, maxQuery])
    .then(result => ({
      min: result[0],
      max: result[1]
    }));
};


/**
 * Searches through the Event collection according to defined input @params
 * @param  {Object} criteria     An object with event data
 * @param  {String} sortProperty The property by which to sort the result set
 * @param  {Number} offset       The number of records to skip in the result set
 * @param  {Number} limit        The number of records to return in the result set
 * @return {Promise}             A Promise that resolves
 */
const customQuery = (criteria, sortProperty, offset = 0, limit = 20) => {
  const query = Event
    .find(buildQuery(criteria))
    .sort({ [sortProperty]: 1 })
    .skip(offset)
    .limit(limit);

  return Promise
    .all([query, Event.find(buildQuery(criteria)).count()])
    .then(results => ({
      all: results[0],
      count: results[1],
      offset,
      limit
    }));
};

const buildQuery = (criteria) => {
  const query = {};

  if (criteria.name) {
    criteria.$text = { $search: critera.name };
  }

  if (criteria.date) {
    query.range = {
      $gte: criteria.date.min,
      $lte: criteria.date.max
    };
  }

  return query;
};


/**
 * Modifies a group of Event class records
 * @param  {Array} _ids  An Array of the _ids denoting those Event records to update
 * @return {Promise}     A Promise that resolves after the update
 */
const batchUpdate = (_ids) => {
  return Event
    .update(
      { _id: { $in: _ids } },
      { multi: true }
    );
};


// Perform
const addEvents = (req, res) => {
  const { name, date, location, description } = req.body;
  const dd = { name, date, location, description };
  console.log('Add Events Request Body:', req.body);

  // Object
  //   .keys(Event.schema.obj)
  //   .forEach(datum => {
  //     params[datum] = params[datum] || '';
  //   });
  new Event(dd).save((err) => {
    if (err) {
      res.status(400).send('SHIT YOOO');
    } else {
      res.json(dd);
    }
  });
};
// router.post('/tasks', function(req, res) {
//   let newTask = new Task(req.body.taskParams);
//   newTask.lastCompleted = null;
//   let homeId = req.body.taskParams._homeId;

//   Home.findById(homeId, function(err, home) {
//     if(err){
//       res.status(400).send("Need a house")
//     } else {
//       let index = Math.floor(Math.random() * home.users.length);
//       newTask.currentUser = home.users[index];
//       newTask.save(function(err) {
//         if(err) {
//           res.status(400).send("Error saving")
//         } else {
//           res.json(newTask);
//         }
//       })
//     }
//   })
// });


// Perform
// const updateEvents = (req, res, next) => {
//   // let  paramsToUpdate = [];

//   // for (var key in req.body) {
//   //   let obj = {};
//   //   obj[key] = req.body[key];
//   //   paramsToUpdate.push(obj);
//   // }

//   Event
//     .update(
//       { _id: req.params.id },
//       ...paramsToUpdate
//     )
//     .exec(handleResponse);
// };

/**
 * Edits a single instance of the Event model
 * @param {string} uuid - The UUID of the event record being edited
 * @param {object} evtProps - An object of property names and the corresponding edits
 * @return {promise} A Promise that resolves when the record has been edited
 */
const updateEvents = (uuid, evtProps) => {
  return Event.update({ uuid }, evtProps);
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

  Event
    .findOneAndRemove({ uuid: req.params.id }, (err, data) => {
      if (err) {
        console.error(`\nError: Failure to execute DELETE request.`);
      } else {
        console.log('\nDELETE request successful!');
        res.json(data);
      }
    });
};

// const deleteEvent = (req, res) => {
//   console.log('REQUEST BODY:', req.body);
//   Event.findByIdAndRemove(req.params.id);
// };


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
