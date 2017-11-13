const Express = require('express');
const BodyParser = require('body-parser');
const EventController = require('../controllers/EventsController');

const router = Express.Router();
const parseUrlEncoded = BodyParser.urlencoded({ extended: false }); // eslint-disable-line no-unused-vars

router
  .route('/')
  .get(EventController.listEvents)
  .post(EventController.addSingleEvent)
  .delete(EventController.deleteBatchEvents);

module.exports = router;
