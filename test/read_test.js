'use strict';
const assert = require('assert'),
      Event = require('../db/models/Event');


describe('Reading events from the database', () => {
  let readTestEvt;

  beforeEach((done) => {
    readTestEvt = new Event({
      name: 'Mocha Read Test Event',
      noteID: 'Test_001',
      type: 'Testing',
      description: 'Mocha test to confirm Event records are queried from MongoDB',
      location: 'San Francisco, CA',
      date: new Date()
    });

    readTestEvt
      .save()
      .then(() => { done(); });
  });

  // Tests that using Mongoose's `find()` method successfully queries all
  //  existing records from the database:
  it('should find all events with a type of \'Testing\'', (done) => {
    Event
      .find({ type: 'Testing' })
      .then((evts) => {
        assert(evts[0]._id.toString() === readTestEvt._id.toString());
        done();
      });
  });

  // Tests that using Mongoose's `findOne()` method successfully queries a
  //  single record from the database:
  it('should find a user with a particular id', (done) => {
    Event
      .findOne({ _id: readTestEvt._id })
      .then((user) => {
        assert(user.name === 'Mocha Read Test Event');
        done();
      });
  });

});
