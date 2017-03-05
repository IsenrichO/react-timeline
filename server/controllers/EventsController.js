'use strict';
const UUID = require('uuid/v4');
const Event = require('../../db/models/Event');
const formatDate = require('../utilities');


// Perform Mongoose query to find all records that are instances of the Event
//  Model, sort them in reverse chronological order (i.e., newest first),
//  limit the sort to the 20 most recent records and pass the callback handler:
const listEvents = (req, res, next) => {
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

// Queries the DB for a single document (record) whose UUID corresponds
//  to the routing param:
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
  const dd = { name, date, location, description, uuid: UUID(), dateModified: Date.now() };
  
  new Event(dd)
    .save()
    .then(() => Event.findOne({ name }))
    .then(evt => res.json(evt))
    .catch(() => {
      res.status(400).send('Failed to create new event!');
      next();
    });
};


/**
 * Edits a single instance of the Event model
 * @param {string} uuid - The UUID of the event record being edited
 * @param {object} evtProps - An object of property names and the corresponding edits
 * @return {promise} A Promise that resolves when the record has been edited
 */
const updateSingleEvent = (req, res, next) => {
  const { params: { uuid }, body: evtProps } = req;
  Event
    .findOneAndUpdate({ uuid }, Object.assign({}, evtProps, { dateModified: Date.now() }))
    .then(() => Event.findOne({ uuid }))
    .then(evt => res.send(evt))
    .catch(() => {
      res.status(400).send('Failed to update specified event!');
      next();
    });
};


// Perform
const deleteSingleEvent = (req, res, next) => {
  const uuid = req.body.uuid;
  Event
    .findOneAndRemove({ uuid })
    .then(() => res.json(uuid))
    .catch(() => {
      res.status(400).send('Failed to delete specified event!');
      next();
    });
};

// 
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
  updateSingleEvent,
  deleteSingleEvent,
  deleteBatchEvents  
};
