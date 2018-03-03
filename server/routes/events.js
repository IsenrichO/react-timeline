const { Router } = require('express');
const EventController = require('../controllers/EventsController');

const router = Router();

router
  .route('/')
  .get(EventController.listEvents)
  .post(EventController.addSingleEvent)
  .delete(EventController.deleteBatchEvents);

module.exports = router;
