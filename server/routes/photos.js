'use strict';
const Express = require('express'),
      router = Express.Router(),
      BodyParser = require('body-parser'),
      Multer = require('multer'),
      Upload = Multer({ dest: 'uploads/' }),
      parseUrlEncoded = BodyParser.urlencoded({ extended: false }),
      PhotosController = require('../controllers/PhotosController');


router
  .route('/')
  .get(PhotosController.fetchCloudinaryImageData)
  .post(Upload.single('files[]'), PhotosController.serverSideCloudinaryUpload);

module.exports = router;
