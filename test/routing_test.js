'use strict';
const assert = require('assert'),
      request = require('supertest'),
      app = require('../server/router'),
      Event = require('../db/models/Event');


describe('The Express application', () => {

  it('should handle GET request to /api/events', done => {
    request(App)
      .get('/api/events')
      .end((err, response) => {
        assert(response.body);
        done();
      });
  });

  it('should recognize PUT requests to the /api/events/:id endpoint and \
      save edited data for an existing event', done => {
    const putEvt = new Event({
      name: 'PUT Request Test Event',
      date: new Date(),
      location: '2872 Harrrison Street, San Francisco, CA',
    });

    putEvt
      .save()
      .then(() => {
        request(app)
          .put(`/api/events/${putEvt._id}`)
          .send({
            location: 'CohortX, 1410 15th Street, San Francisco, CA 94103'
          })
          .end(() => {
            Event
              .findOne({ name: 'PUT Request Test Event' })
              .then((evt) => {
                assert(evt.location === 'PUT Request Test Event');
                done();
              });
          });
      })
  });

  it('should interpret DELETE requests to the /api/events/:id endpoint and \
      delete the queried record from the database', done => {
    const deleteEvt = new Event({
      name: 'DELETE Request Test Event',
      date: new Date(),
      location: '2872 Harrrison Street, San Francisco, CA',
    });

    deleteEvt
      .save()
      .then(() => {
        request(app)
          .delete(`/api/events/${deleteEvt._id}`)
          .end(() => {
            Event
              .findOne({ name: 'DELETE Request Test Event' })
              .then(evt => {
                assert(evt === null);
                done();
              });
          });
      })
  });

});
