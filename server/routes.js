'use strict';
const contr = require('./aaa');
// const EventsController = require('./controllers/EventsController');

// routes.js
module.exports = (app) => {
  // Watch for incoming requests of method GET to the
  //  http://localhost:3000/api/events endpoint:
  app.get('/api/events', contr.listEvents),

  app.post('/api/events', contr.addEvents),

  app.put('/api/events/edit/:eventId', contr.updateEvents),

  app.delete('/api/events/edit/:eventId', contr.deleteEvents)
};
