'use strict';
const assert = require('assert'),
      Event = require('../db/models/Event');


describe('Deleting events', () => {
  let deleteTestEvt;

  beforeEach((done) => {
    deleteTestEvt = new Event({
      name: 'Mocha Deletion Test Event',
      noteID: 'Test_001',
      type: 'Testing',
      description: 'Mocha test to confirm Event records are removed from MongoDB',
      location: 'San Francisco, CA',
      date: new Date()
    });

    deleteTestEvt
      .save()
      .then(() => { done(); });
  });

  // Tests that an instance of the `Event` model is successfully dropped from
  //  the database using Mongoose's instance-based `remove()` method:
  it('should remove a record using the instance-based `remove()` method', (done) => {
    deleteTestEvt
      .remove()
      .then(() => Event.findOne({ name: 'Mocha Deletion Test Event' }))
      .then((evt) => {
        assert(evt === null);
        done();
      });
  });

  // Tests that instances of the `Event` class queried using Mongoose's class-
  //  based `remove()` method are successfully dropped from the database:
  it('should remove records using the class-based `remove()` method', (done) => {
    Event
      .remove({ name: 'Mocha Deletion Test Event' })
      .then(() => Event.findOne({ name: 'Mocha Deletion Test Event' }))
      .then((evt) => {
        assert(evt === null);
        done();
      });
  });

  // Tests that the single record of the `Event` class queried by Mongoose's
  //  `findOneAndRemove()` method is successfully dropped from the database:
  it('should remove records using the class-based `findOneAndRemove()` method', (done) => {
    Event
      .findOneAndRemove({ name: 'Mocha Deletion Test Event' })
      .then(() => Event.findOne({ name: 'Mocha Deletion Test Event' }))
      .then((evt) => {
        assert(evt === null);
        done();
      });
  });

  // Tests that the single record of the `Event` class queried by Mongoose's
  //  `findByIdAndRemove()` method is successfully dropped from the database:
  it('should remove a record using the class-based `findByIdAndRemove()` method', (done) => {
    Event
      .findByIdAndRemove(deleteTestEvt._id)
      .then(() => Event.findOne({}))
      .then((evt) => {
        assert(evt === null);
        done();
      });
  });

});
