const { Router } = require('express');
const EventController = require('../controllers/EventsController');

const router = Router();

router
  .route('/:uuid')
  .get(EventController.getSingleEvent)
  .put(EventController.updateSingleEvent)
  .delete(EventController.deleteSingleEvent);

module.exports = router;
