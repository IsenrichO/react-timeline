'use strict';
const assert = require('assert'),
      request = require('supertest'),
      app = require('../server/router');


describe('The Express application', () => {

  it('should handle GET request to /api/events', (done) => {
    request(App)
      .get('/api/events')
      .end((err, response) => {
        assert(response.body);
        done();
      });
  });

});
