const { Router } = require('express');
const SearchController = require('../controllers/SearchController');

const router = Router();

router
  .route('/')
  .get(SearchController.getAllEvents);

module.exports = router;
