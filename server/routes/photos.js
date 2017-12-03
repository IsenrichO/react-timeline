const Express = require('express');
const BodyParser = require('body-parser');
const Multer = require('multer');
const PhotosController = require('../controllers/PhotosController');

const router = Express.Router();
const parseUrlEncoded = BodyParser.urlencoded({ extended: false });

const Upload = Multer({ dest: 'uploads/' });

router
  .route('/')
  .get(PhotosController.fetchCloudinaryImageData)
  .post(Upload.single('files[]'), PhotosController.serverSideCloudinaryUpload);

module.exports = router;
