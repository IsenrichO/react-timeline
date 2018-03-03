const { Router } = require('express');
const Multer = require('multer');
const PhotosController = require('../controllers/PhotosController');

const router = Router();
const Upload = Multer({ dest: 'uploads/' });

router
  .route('/')
  .get(PhotosController.fetchCloudinaryImageData)
  .post(Upload.single('files[]'), PhotosController.serverSideCloudinaryUpload);

module.exports = router;
