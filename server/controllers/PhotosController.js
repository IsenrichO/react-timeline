'use strict';

const cloudinary = require('cloudinary').v2;
// const schema = require('../config/schema');
// const crypto = require('crypto');
// const Photo = schema.models.Photo;
// const multipart = require('connect-multiparty');
// const multipartMiddleware = multipart();
const Photo = require('../../db/models/EventPhoto');



const uploadOptions = (evt) => ({
  folder: ((uuid) => `React-Timeline/${uuid}/`)(evt.uuid),
  use_filename: true,
  unique_filename: true,
  resource_type: 'auto',
  type: 'upload',
  access_mode: 'public',
  discard_original_filename: false,
  overwrite: true,
  return_delete_token: true,
  tags: ((tags) => ['React-Timeline', 'Cloudinary Upload', 'Event Photo', 'Unsigned'].concat(tags))(evt.type)
});



// 
const addNewPhoto = (req, res, next) => {
  const { title, url, dateTaken, locationTaken, isCoverPhoto } = req.body;
  const photoData = { title, url, dateTaken, locationTaken, isCoverPhoto };
  new Photo(photoData)
    .save()
    .then(() => Photo.findOne({ url }))
    .then(photo => res.json(photo))
    .catch(() => {
      res.status(400).send('Failed to create new photo!');
      next();
    });
};

// 
function create_through_server(req, res, next) {
  // In through-the-server mode, the image is first uploaded to the server
  // and from there to Cloudinary servers.
  // The upload metadata (e.g. image size) is then added to the photo  model (photo.image)
  // and then saved to the database.

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

  // file was not uploaded redirecting to upload 
    // if (req.files.image.ws.bytesWritten == 0) {
    //   res.redirect('/photos/add');
    //   return;
    // }

  console.log('\n\nREQ BODY:', req.body);
  const { evt, url, title } = req.body;
  var photo = new Photo({ title, url });

  // Upload file to Cloudinary
  cloudinary.uploader
    .upload(url, uploadOptions(evt))
    .then(photo => res.send(photo))
    .catch(err => {
      console.log('Error uploading photo to Cloudinary:\t', err);
      next();
    });
}


module.exports = {
  addNewPhoto,
  create_through_server
};
