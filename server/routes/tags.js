const { Router } = require('express');
const TagsController = require('../controllers/TagsController');

const router = Router();

router
  .route('/')
  .get(TagsController.fetchAllTags);

module.exports = router;
