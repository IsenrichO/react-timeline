'use strict';
const Express = require('express'),
      router = Express.Router(),
      BodyParser = require('body-parser'),
      parseUrlEncoded = BodyParser.urlencoded({ extended: false }),
      PhotosController = require('../controllers/PhotosController');


router
  .route('/')
  .get(PhotosController.fetchCloudinaryImageData)
  .post(PhotosController.serverSideCloudinaryUpload);

module.exports = router;
