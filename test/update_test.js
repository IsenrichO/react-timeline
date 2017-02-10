'use strict';
const assert = require('assert');
const Event = require('../db/models/Event');


describe('Updating records', () => {
  let updateTestEvt;

  beforeEach((done) => {
    updateTestEvt = new Event({
      name: 'Mocha Update Test Event',
      noteID: 'Test_001',
      type: 'Testing',
      description: 'Mocha test to confirm Event records are updated in MongoDB',
      location: 'San Francisco, CA',
      date: new Date(),
      photoCount: 0
    });

    updateTestEvt
      .save()
      .then(() => { done(); });
  });

  // Utility function for abstracting the chained `.then()` methods:
  function assertName(operation, done) {
    operation
      .then(() => Event.find({}))
      .then((evts) => {
        assert(evts.length === 1);
        assert(evts[0].name === 'Updated Mocha Test Event');
        done();
      });
  };

  // Tests that updates to an existing record using Mongoose's `.set()` method are saved:
  it('should update an existing record using instance-type set n\' save', (done) => {
    updateTestEvt.set('name', 'Updated Mocha Test Event');
    assertName(updateTestEvt.save(), done);
  });

  // Tests that updates to an existing record using Mongoose's `.update()` method are saved:
  it('should update a model instance', (done) => {
    assertName(updateTestEvt.update({ name: 'Updated Mocha Test Event' }), done);
  });

  // Tests that bulk updates to all instances of the `Event` model class using
  //  Mongoose's `update()` method are saved:
  it('should update a model class', (done) => {
    assertName(
      Event.update({ name: 'Mocha Update Test Event' }, { name: 'Updated Mocha Test Event' }),
      done
    );
  });

  // Tests that updates to a single instance of the `Event` model class performed using
  //  Mongoose's `findOneAndUpdate()` method are saved:
  it('should update one instance record of a model class', (done) => {
    assertName(
      Event.findOneAndUpdate({ name: 'Mocha Update Test Event' }, { name: 'Updated Mocha Test Event' }),
      done
    );
  });

  // Tests that updates to an instance of the `Event` model class performed using
  //  Mongoose's `findByIdAndUpdate()` method are saved:
  it('should update an instance record of a model class queried by ID', (done) => {
    assertName(
      Event.findByIdAndUpdate(updateTestEvt._id, { name: 'Updated Mocha Test Event' }),
      done
    );
  });

  // Tests that records for which the `photoCount` property is incremented are properly
  //  saved to the database with the adjusted value:
  it('should allow the `photoCount` to be incremented', (done) => {
    Event
      .update({ name: 'Mocha Update Test Event' }, { $inc: { photoCount: 3 } })
      .then(() => Event.findOne({ name: 'Mocha Update Test Event' }))
      .then((evt) => {
        assert(evt.photoCount === 3);
        done();
      });
  });

});
