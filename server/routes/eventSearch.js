const Express = require('express');
const BodyParser = require('body-parser');
const SearchController = require('../controllers/SearchController');

const router = Express.Router();
const parseUrlEncoded = BodyParser.urlencoded({ extended: false });

router
  .route('/')
  .get(SearchController.getRecentlyModified);

module.exports = router;
