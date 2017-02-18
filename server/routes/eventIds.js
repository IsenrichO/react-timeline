'use strict';
const Express = require('express'),
      router = Express.Router(),
      BodyParser = require('body-parser'),
      parseUrlEncoded = BodyParser.urlencoded({ extended: false }),
      ApI = require('../aaa');


router
  .route('/:id')
  .get(ApI.getIndividualEvent)
  .put(ApI.updateSingleEvent)
  .delete(ApI.deleteEvents);

// updateEvents
module.exports = router;
