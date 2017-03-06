'use strict';
const Event = require('../../db/models/Event');


// Queries the DB for a result set containing all starred events:
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

// Queries the DB for a result set representing the events most
//  most recently modified. Optionally, it may take a `limit`
//  parameter (to be retrieved from the User settings) that defines
//  the number of records which to display:
const getRecentlyModified = (req, res, next) => {
  const { resultSetSize: limitSize = 3 } = req.body;
  console.log('getting recently modified', req.body);
  Event
    .find({})
    .sort({ dateModified: -1 })
    .limit(limitSize)
    .then(evts => {
      console.log('\n\nSending recent events', evts);
      res.json(evts);
    })
    .catch(err => {
      res.status(400).send('Failed to fetch recently modified events!');
      next();
    });
};

/**
 * Finds the earliest and latest chronological events for a given set of event data:
 * @return {promise} A Promise that resolves with an object literal containing the min
 *                   and max dates (e.g., `{ min: <EARLIEST_DATE>, max: <LATEST_DATE> }`)
 */
const getAgeRange = () => {
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
    .then(result => ({ min: result[0], max: result[1] }));
};


/**
 * A higher-order function that builds custom search queries according to given input(s):
 * @param {object} criteria An object
 * @param {string} sortProperty The property by which to effect the sort
 * @param {integer} offset The number of records to skip from the result set
 * @param {integer} limit The number of records to which the result set is constrained
 * @return {promise} A Promise that resolves with the events, count, offset and limit (e.g.,
 *                   `{ all: [events], count: <COUNT>, offset: <OFFSET>, limit: <LIMIT> }`)
 */
const customQuery = (criteria, sortProperty = 'date', offset = 0, limit = 20) => {
  const query = Event
    .find(buildQuery(criteria))
    .sort({ [sortProperty]: 1 })
    .skip(offset)
    .limit(limit);

  return Promise
    .all([query, Event.count()])
    .then(results => ({
      all: results[0],
      count: results[1],
      offset,
      limit
    }));
};


//
const buildQuery = (criteria) => {
  const query = {};
  if (criteria.date) {
    query.date = {
      $gte: criteria.date.min,
      $lte: criteria.date.max
    };
  }
  return query;
};


module.exports = {
  buildQuery,
  customQuery,
  getRecentlyModified,
  getStarredEvents
};
