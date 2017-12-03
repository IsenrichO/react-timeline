const Express = require('express');
const BodyParser = require('body-parser');
const TagsController = require('../controllers/TagsController');

const router = Express.Router();
const parseUrlEncoded = BodyParser.urlencoded({ extended: false });

router
  .route('/')
  .get(TagsController.fetchAllTags);

module.exports = router;
