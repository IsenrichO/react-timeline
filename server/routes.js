const contr = require('./aaa');
const { constructApiEndpoint } = require('./utils');
// const EventsController = require('./controllers/EventsController');

// routes.js
module.exports = (app) => {
  // Watch for incoming requests of method GET to the
  //  http://localhost:3000/api/v1/events endpoint:
  app.get(constructApiEndpoint('events'), contr.listEvents),
  app.post(constructApiEndpoint('events'), contr.addEvents),
  app.put(constructApiEndpoint('events/edit/:uuid'), contr.updateEvents),
  app.delete(constructApiEndpoint('events/edit/:uuid'), contr.deleteEvents),
};
