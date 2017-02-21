'use strict';
const Express = require('express'),
      router = Express.Router(),
      BodyParser = require('body-parser'),
      parseUrlEncoded = BodyParser.urlencoded({ extended: false }),
      EventController = require('../controllers/EventsController');


router
  .route('/')
  .get(EventController.listEvents)
  .post(EventController.addSingleEvent)
  .delete(EventController.deleteBatchEvents);

module.exports = router;
