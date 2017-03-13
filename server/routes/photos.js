'use strict';
const Express = require('express'),
      router = Express.Router(),
      BodyParser = require('body-parser'),
      parseUrlEncoded = BodyParser.urlencoded({ extended: false }),
      PhotosController = require('../controllers/PhotosController');


router
  .route('/')
  .post(PhotosController.create_through_server);

module.exports = router;
