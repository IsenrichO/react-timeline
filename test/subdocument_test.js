'use strict';
const assert = require('assert'),
      Event = require('../db/models/Event');


describe('Sub-documents', () => {
  let subDocEvt;
  const photoSubDoc = {
    title: 'Test Event Photo Sub-Document',
    url: 'http://lorempixel.com/400/200/',
    dateTaken: Date.now(),
    locationTaken: 'San Francisco, CA',
    isCoverPhoto: false
  };

  beforeEach((done) => {
    subDocEvt = new Event({
      name: 'Sub-Document Test Event',
      date: new Date(),
      photos: [photoSubDoc]
    });

    subDocEvt
      .save()
      .then(() => { done(); });
  });
  
  // Tests that photo sub-documents can be successfully created:
  it('should be able to create a sub-document', (done) => {
    subDocEvt
      .save()
      .catch((err) => { console.log(`Caught Error:\t${err}`); })
      .then(() => Event.findOne({ name: 'Sub-Document Test Event' }))
      .then((evt) => {
        assert(evt.photos[0].title === 'Test Event Photo Sub-Document');
        done();
      });
  });

  it('should be able to remove sub-documents on existing records', (done) => {
    subDocEvt
      .save()
      .then(() => Event.findOne({ name: 'Sub-Document Test Event' }))
      .then((evt) => {
        const evtPhoto = evt.photos[0];
        evtPhoto.remove();
        return evt.save();
      })
      .then(() => Event.findOne({ name: 'Sub-Document Test Event' }))
      .then((evt) => {
        assert(evt.photos.length === 0);
        done();
      });
  });

});


describe('Addition of sub-documents', () => {
  let subDocEvt;
  const photoSubDoc = {
    title: 'Test Event Photo Sub-Document',
    url: 'http://lorempixel.com/400/200/',
    dateTaken: Date.now(),
    locationTaken: 'San Francisco, CA',
    isCoverPhoto: false
  };

  beforeEach((done) => {
    subDocEvt = new Event({
      name: 'Sub-Document Test Event',
      date: new Date(),
      photos: []
    });

    subDocEvt
      .save()
      .then(() => { done(); });
  });

  // Tests that photo sub-documents can be created within instances of
  //  the `Event` model:
  it('should be able to add sub-documents to existing records', (done) => {
    subDocEvt
      .save()
      .then(() => Event.findOne({ name: 'Sub-Document Test Event' }))
      .then((evt) => {
        evt.photos.push(photoSubDoc);
        return evt.save();
      })
      .then(() => Event.findOne({ name: 'Sub-Document Test Event' }))
      .then((evt) => {
        assert(evt.photos[0].title === 'Test Event Photo Sub-Document');
        done();
      });
  });

});
