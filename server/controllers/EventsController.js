const uuidv4 = require('uuid/v4');
const keyBy = require('lodash/keyBy');
const Event = require('../../db/models/Event');
const formatDate = require('../utilities');

// Perform Mongoose query to find all records that are instances of the Event
//  Model, sort them in reverse chronological order (i.e., newest first),
//  limit the sort to the 20 most recent records and pass the callback handler:
const listEvents = (req, res, next) => {
  Event
    .find({})
    .sort({ date: 'desc'})
    .limit(10)
    .then((evts) => {
      const structuredEvtData = keyBy(evts, ({ uuid = uuidv4() }) => uuid);
      res.send(structuredEvtData);
    })
    .catch((err) => {
      res
        .status(400)
        .send('Failed to fetch requested events!');
      next();
    });
};

// Queries the DB for a single document (record) whose UUID corresponds
//  to the routing param:
const getSingleEvent = (req, res, next) => {
  const sendResponse = (err, docs) => { res.send(docs); };

  Event
    .find({})
    .limit(+req.params.eventId)
    .sort({ date: 'desc' })
    .then((evts) => {
      const structuredEvtData = keyBy(evts, ({ uuid = uuidv4() }) => uuid);
      res.send(structuredEvtData);
    })
    .catch((err) => {
      res
        .status(400)
        .send('Failed to fetch requested event!');
      next();
    });
};

// Perform
const addSingleEvent = (req, res, next) => {
  const { name, date, location, description } = req.body;
  const dd = { date, dateModified: Date.now(), description, location, name, uuid: uuidv4() };

  new Event(dd)
    .save()
    .then(() => Event.findOne({ name }))
    .then((evt) => res.json(evt))
    .catch(() => {
      res
        .status(400)
        .send('Failed to create new event!');
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
  const {
    body: evtProps,
    params: { uuid },
  } = req;

  Event
    .findOneAndUpdate({ uuid }, Object.assign({}, evtProps, { dateModified: Date.now() }))
    .then(() => Event.findOne({ uuid }))
    .then((evt) => res.send(evt))
    .catch(() => {
      res
        .status(400)
        .send('Failed to update specified event!');
      next();
    });
};

// Perform
const deleteSingleEvent = (req, res, next) => {
  const { uuid } = req.params;

  Event
    .findOneAndRemove({ uuid })
    .then(() => res.json && res.json(uuid))
    .catch(() => {
      res
        .status(400)
        .send('Failed to delete specified event!');
      next();
    });
};

//
const deleteBatchEvents = (req, res, next) => {
  const uuids = req.body;

  Event
    .remove({ uuid: { $in: uuids }})
    .then(() => res.json && res.json(uuids))
    .catch(() => {
      res
        .status(400)
        .send('Failed to delete selected events!');
      next();
    });
};

/* MODULE EXPORTS */
module.exports = {
  addSingleEvent,
  deleteBatchEvents,
  deleteSingleEvent,
  getSingleEvent,
  listEvents,
  updateSingleEvent,
};
