'use strict';
const Express = require('express'),
      router = Express.Router(),
      BodyParser = require('body-parser'),
      parseUrlEncoded = BodyParser.urlencoded({ extended: false }),
      EventController = require('../controllers/EventsController');


router
  .route('/:uuid')
  .get(EventController.getSingleEvent)
  .put(EventController.updateSingleEvent)
  .delete(EventController.deleteSingleEvent);

module.exports = router;
