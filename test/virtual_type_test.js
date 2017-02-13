'use strict';
const assert = require('assert'),
      Event = require('../db/models/Event');


describe('Virtual types', () => {
  let virtualEvt;

  beforeEach((done) => {
    virtualEvt = new Event({
      name: 'Virtual Test Event',
      noteID: 'Test_001',
      type: 'Testing',
      description: 'Mocha test to confirm Event records are updated in MongoDB',
      location: 'San Francisco, CA',
      date: new Date(),
      photos: [{ title: 'Virtual Test Event Photo Sub-Document' }],
      numRevisions: 0
    });

    virtualEvt
      .save()
      .then(() => { done(); });
  });


  it('should be able to read virtual properties', (done) => {
    virtualEvt
      .save()
      .catch((err) => { console.log(`Caught Error:\t${err}`); })
      .then(() => Event.findOne({ name: 'Virtual Test Event' }))
      .then((evt) => {
        assert(evt.photoCount === 1);
        done();
      })
      .catch((err) => { console.log(`Caught Error:\t${err}`); });
  });

});
