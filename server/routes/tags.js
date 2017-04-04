'use strict';
const Express = require('express'),
      router = Express.Router(),
      BodyParser = require('body-parser'),
      parseUrlEncoded = BodyParser.urlencoded({ extended: false }),
      TagsController = require('../controllers/TagsController');


router
  .route('/')
  .get(TagsController.fetchAllTags);

module.exports = router;
