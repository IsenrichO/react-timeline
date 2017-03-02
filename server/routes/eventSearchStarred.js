'use strict';
const Express = require('express'),
      router = Express.Router(),
      BodyParser = require('body-parser'),
      parseUrlEncoded = BodyParser.urlencoded({ extended: false }),
      EventController = require('../controllers/EventsController');


router
  .route('/search/starred')
  .get(EventsController.getStarredEvents);

module.exports = router;
