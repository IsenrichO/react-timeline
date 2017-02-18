'use strict';
const Express = require('express'),
      router = Express.Router(),
      BodyParser = require('body-parser'),
      parseUrlEncoded = BodyParser.urlencoded({ extended: false }),
      ApI = require('../aaa');


router
  .route('/')
  .get(ApI.getIndividualEvent)
  .put(ApI.updateEvents)
  .delete(ApI.deleteEvents);

module.exports = router;
