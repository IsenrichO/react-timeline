'use strict';
const Express = require('express'),
      router = Express.Router(),
      BodyParser = require('body-parser'),
      parseUrlEncoded = BodyParser.urlencoded({ extended: false }),
      ApI = require('../aaa');


router
  .route('/')
  .get(ApI.listEvents)
  .post(ApI.addEvents)
  .delete(ApI.deleteBatchEvents);

module.exports = router;