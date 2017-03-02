'use strict';
var Event = require('../../db/models/Event');
const formatDate = require('../utilities');


// Perform Mongoose query to find all records that are instances of the Event
//  Model, sort them in reverse chronological order (i.e., newest first),
//  limit the sort to the 20 most recent records and pass the callback handler:
const listEvents = (req, res) => {
  Event
    .find({})
    .sort({ date: 'desc'})
    .limit(20)
    .then(evts => res.send(evts))
    .catch(err => {
      res.status(400).send('Failed to fetch requested events!');
      next();
    });
};


const getStarredEvents = (req, res, next) => {
  Event
    .find({ starred: true })
    .then(evts => {
      console.log('Starred Response:', evts);
      res.send(evts);
    })
    .catch(err => {
      res.status(400).send('Failed to fetch starred events!');
      next();
    });
};


const getSingleEvent = (req, res, next) => {
  const sendResponse = (err, docs) => { res.send(docs); }
  Event
    .find({})
    .limit(+req.params.eventId)
    .sort({ date: 'desc' })
    .then(evt => res.send(evt))
    .catch(err => {
      res.status(400).send('Failed to fetch requested event!');
      next();
    });
};


// Perform
const addSingleEvent = (req, res, next) => {
  const { name, date, location, description } = req.body;
  const dd = { name, date, location, description };

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


/**
 * Edits a single instance of the Event model
 * @param {string} uuid - The UUID of the event record being edited
 * @param {object} evtProps - An object of property names and the corresponding edits
 * @return {promise} A Promise that resolves when the record has been edited
 */
const updateSingleEvent = (req, res, next) => {
  const { params: { id: evtId }, body: evtProps } = req;
  Event
    .findOneAndUpdate({ eventId: evtId }, evtProps)
    .then(() => Event.findOne({ eventId: evtId }))
    .then(evt => res.send(evt))
    .catch(() => {
      res.status(400).send('Failed to update specified event!');
      next()
    });
};


// Perform
const deleteSingleEvent = (req, res, next) => {
  const uuid = req.body.eventId;
  Event
    .findOneAndRemove({ eventId: uuid })
    .then(() => res.json(uuid))
    .catch(() => {
      res.status(400).send('Failed to delete specified event!');
      next();
    });
};


const deleteBatchEvents = (req, res, next) => {
  const uuids = req.body;
  Event
    .remove({ uuid: { $in: uuids }})
    .then(() => res.json(uuids))
    .catch(() => {
      res.status(400).send('Failed to delete selected events!');
      next();
    });
};


module.exports = {
  getSingleEvent,
  addSingleEvent,
  listEvents,
  getStarredEvents,
  updateSingleEvent,
  deleteSingleEvent,
  deleteBatchEvents  
};
