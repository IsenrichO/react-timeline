'use strict';
const assert = require('assert'),
      Mongoose = require('mongoose'),
      Event = require('../db/models/Event'),
      Photo = require('../db/models/EventPhoto');



describe('Associations', () => {
  const name = 'Testing for successful association of Schemas',
        url = 'https://avatars0.githubusercontent.com/u/11098273',
        date = Date.now();
  let AssociationEvent, AssociationPhoto;

  beforeEach((done) => {
    AssociationEvent = new Event({ name, date });
    AssociationPhoto = new Photo({ url });

    AssociationEvent.photos.push(AssociationPhoto);
    Promise
      .all([AssociationEvent.save(), AssociationPhoto.save()])
      .then(() => done());
  });

  it('should create an association between an event and a photo', (done) => {
    Event
      .findOne({ name })
      .populate('photos')
      .then(evt => {
        assert(evt.photos[0].url === 'https://avatars0.githubusercontent.com/u/11098273');
        done();
      });
  });

});
