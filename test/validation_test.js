'use strict';
const assert = require('assert');
const Event = require('../db/models/Event');


describe('Validation of User records', () => {

  // Tests that records for which no `name` property is defined are marked invalid
  //  and return a validation fallback message:
  it('should require a name for every event', () => {
    const validationEvt = new Event({ name: undefined }),
          validationResult = validationEvt.validateSync(),
          { message } = validationResult.errors.name;

    assert(message === 'This event requires a name.');
  });

  // Tests that records for which the `name` property is less than three (3) characters
  //  in length are marked invalid and return a validation fallback message:
  it ('should require an event\'s name to be at least 3 characters long', () => {
    const validationEvt = new Event({ name: 'ab' }),
          validationResult = validationEvt.validateSync(),
          { message } = validationResult.errors.name;

    assert(message === 'Your event name must be at least 3 characters long.');
  });

  // Tests that attempts to `save()` records marked as invalid to the database are caught
  //  as errors and are not added to the database:
  it('should disallow invalid records from being saved to the database', (done) => {
    const invalidEvt = new Event({ name: 'ab', });
    invalidEvt
      .save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.name;

        assert(message === 'Your event name must be at least 3 characters long.');
        done();
      });
  });

});
