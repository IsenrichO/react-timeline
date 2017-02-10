'use strict';
const assert = require('assert');
const Event = require('../db/models/Event');


describe('Creating records', () => {
  // Variable declaration outside the `beforeEach` hook persists within scope:
  let createTestEvt;

  // Reassign record to the scoped `readTestEvt` variable and save to MongoDB:
  beforeEach(() => {
    createTestEvt = new Event({
      name: 'Mocha Create Test Event',
      noteID: 'Test_001',
      type: 'Testing',
      description: 'Mocha test to confirm new Event records are saved to MongoDB',
      location: 'San Francisco, CA',
      date: new Date()
    });
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
