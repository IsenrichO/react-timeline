'use strict';
const assert = require('assert'),
      Event = require('../db/models/Event');


describe('Reading events from the database', () => {
  let readTestEvt;

  beforeEach((done) => {
    readTestEvt = new Event({
      name: 'Mocha Read Test Event',
      eventId: 'Test_001',
      type: 'Testing',
      description: 'Mocha test to confirm Event records are queried from MongoDB',
      location: 'San Francisco, CA',
      date: new Date()
    });

    // [readTestEvt, readTestEvt2, readTestEvt3, readTestEvt4] = new Array(4)
    //   .fill(new Event({
    //     name: 'Mocha Skip & Limit Querying Test Event No. ',
    //     noteID: 'Test_001',
    //     type: 'Testing',
    //     description: 'Mocha test to confirm Mongoose `.skip()` and `.limit()` queries\
    //                   function as intended.',
    //     location: 'San Francisco, CA',
    //     date: new Date()
    //   }))
    //   .map((evt, index) => Object.assign({}, evt, { name: `${evt.name}${index + 1}` }));

    readTestEvt
      .save()
      .then(() => done());
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

describe('Handling big collections with pagination', () => {
  let skipLimitTest1, skipLimitTest2, skipLimitTest3, skipLimitTest4;

  beforeEach((done) => {
    [skipLimitTest1, skipLimitTest2, skipLimitTest3, skipLimitTest4] = new Array(4)
      .fill({})
      .map((evt, index) => evt = new Event({
        name: `Mocha Skip & Limit Querying Test Event No. ${index + 1}`,
        noteID: `PaginationTestNo_${index + 1}`,
        type: 'Testing',
        description: 'Mocha test to confirm Mongoose `.skip()` and `.limit()` queries\
                      function as intended.',
        location: 'San Francisco, CA',
        date: new Date()
      }));

    Promise
      .all([skipLimitTest1.save(), skipLimitTest2.save(), skipLimitTest3.save(), skipLimitTest4.save()])
      .then(() => done());
  });

  // Tests that
  it('should allow for skipping and limiting the result set', (done) => {
    // Because we cannot guarantee that the four `skipLimitTest<#>` Event records will `save` to the DB
    //  in the order they were declared inside the `Promise.all()` method call, observe that a `sort()`
    //  call is chained below to ensure our records have a predictable order and ensure our `assert`ions
    //  test a verifiable state.
    Event
      .find({})
      .sort({ name: 1 })  // Sort by the `name` property in ascending order
      .skip(1)
      .limit(2)
      .then(evts => {
        // Tests proper functioning of the `limit()` call:
        assert(evts.length === 2);

        // Tests values of result set based on `skip()` call:
        assert(evts[0].name === 'Mocha Skip & Limit Querying Test Event No. 2');
        assert(evts[1].name === 'Mocha Skip & Limit Querying Test Event No. 3');
        done();
      });
  });

});

