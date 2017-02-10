'use strict';
const assert = require('assert');
const Event = require('../db/models/Event');


describe('Validation of User records', () => {

  it('should require a name for every event', () => {
    const validationEvt = new Event({ name: undefined }),
          validationResult = validationEvt.validateSync(),
          { message } = validationResult.errors.name;

    assert(message === 'This event requires a name.');
  });

  it ('should require an event\'s name to be at least 3 characters long', () => {
    const validationEvt = new Event({ name: 'ab' }),
          validationResult = validationEvt.validateSync(),
          { message } = validationResult.errors.name;

    assert(message === 'Your event name must be at least 3 characters long.');
  });

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
