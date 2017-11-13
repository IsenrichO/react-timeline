const Express = require('express');
const BodyParser = require('body-parser');
const EventController = require('../controllers/EventsController');

const router = Express.Router();
const parseUrlEncoded = BodyParser.urlencoded({ extended: false });

router
  .route('/:uuid')
  .get(EventController.getSingleEvent)
  .put(EventController.updateSingleEvent)
  .delete(EventController.deleteSingleEvent);

module.exports = router;
