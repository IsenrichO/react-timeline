'use strict';
const assert = require('assert'),
      Event = require('../db/models/Event');


describe('Creating records', () => {
  // Variable declaration outside the `beforeEach` hook persists within scope:
  let createTestEvt;

  // Reassign record to the scoped `readTestEvt` variable and save to MongoDB:
  beforeEach(() => {
    createTestEvt = new Event({
      name: 'Mocha Create Test Event',
      eventId: 'Test_001',
      type: 'Testing',
      description: 'Mocha test to confirm new Event records are saved to MongoDB',
      location: 'San Francisco, CA',
      date: new Date()
    });
  });

  // Confirms that the default mpromise library which comes out of the box with
  //  Mongoose has been overridden by ES6-style native Promises:
  it('should use the native ES6 Promise API', (done) => {
    const query = Event.findOne({ name: 'Mocha Create Test Event' });
    assert.equal(query.exec().constructor, global.Promise);
  });

  // Tests that a new instance of the `Event` class is successfully saved to
  //  the database:
  it('should save a new event to the database', (done) => {
    createTestEvt
      .save()
      .then(() => {
        assert(!createTestEvt.isNew);
        done();
      });
  });

});
