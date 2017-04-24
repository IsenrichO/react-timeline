'use strict';
const Cloudinary = require('cloudinary').v2;
// const schema = require('../config/schema');
// const crypto = require('crypto');
// const Photo = schema.models.Photo;
// const multipart = require('connect-multiparty');
// const multipartMiddleware = multipart();
const Photo = require('../../db/models/EventPhoto');
const Axios = require('axios');
const Multer = require('multer');


// Utility function that returns a `len`-character-long (pseudo-)random
//  string of integers:
const randCacheBustSuffix = (len = 9) => Array.from(
  { length: len },
  (_, i) => Math.round(Math.random() * (i + 1))
).join('');

// A utility function for quickly extracting an object to serve as the
//  default Cloudinary uploading options configuration object:
const uploadOptions = (evt, uploadTitle) => ({
  public_id: uploadTitle,
  folder: ((uuid) => `React-Timeline/${uuid}/`)(evt.uuid),
  use_filename: true,
  unique_filename: true,
  resource_type: 'auto',
  type: 'upload',
  access_mode: 'public',
  discard_original_filename: false,
  overwrite: true,
  async: true,
  return_delete_token: true,
  allowed_formats: ['bmp', 'gif', 'jpg', 'mp4', 'ogv', 'pdf', 'png', 'svg', 'tiff', 'raw'],
  tags: ((tags) => ['React-Timeline', 'Cloudinary Upload', 'Event Photo', 'Unsigned'].concat(tags))(evt.type)
});



// 
const addNewPhoto = (req, res, next) => {
  console.log('\n\n\n\nADD NEW PHOTO (Server):');
  const { title, event, url, dateTaken, locationTaken, isCoverPhoto = false } = req.body;
  const photoData = { title, url, event, dateTaken, locationTaken, isCoverPhoto };
  new Photo(photoData)
    .save()
    .then(() => Photo.findOne({ url }))
    .then(photo => res.json(photo))
    .catch(() => {
      res.status(400).send('Failed to create new photo!');
      next();
    });
};

// In through-the-server mode, the image is first uploaded to the server
//  and from there to Cloudinary servers. The upload metadata (e.g., image
//  size) is then added to the photo  model (photo.image) and then saved
//  to the database.
const serverSideCloudinaryUpload = (req, res, next) => {
  console.log('\n\nREQ BODY:', req.body);
  console.log(req);
  console.log('\n\n\n\nREQ.FILES:', req.file, req.files);
  const { evt, url, title } = req.body;
  var photo = new Photo({ title, url });

  console.log('\nUpload Options:', uploadOptions(evt, title));

  addNewPhoto(req, res, next);

  Cloudinary.uploader
    .upload(url, uploadOptions(evt, title))
    .then(photo => {
      console.log('\n\n\nPHOTO UPLOADER:', photo);
      return res.json(photo);
    })
    .catch(err => {
      console.log(`Error uploading photo to Cloudinary:\t${err}`);
      next();
    });
};

// 
const fetchSubfolderNames = () => {
  const extractSubfolderName = (path) => path.replace(/^.+\/(.+)\/.+$/, '$1');

  return Axios
    .get(`${process.env.ADMIN_URL}/folders/React-Timeline`);
    // .then(resp => {
    //   console.log(resp.data);
    //   res.json(resp.data.folders);
    // })
    // .catch(err => {
    //   console.log(err);
    //   next();
    // });
};

const fetchAll = () => {
  /**
   * Other Endpoints:
   *   > /folders/React-Timeline
   *   > /resources/image/upload
   */
  console.log('\n\n\nSTARTING CALL\n\n');
  return Axios
    .get(`${process.env.ADMIN_URL}/resources/image`)
    // .then(resp => {
    //   const tlImages = resp.data.resources.filter(img => /^React-Timeline\//.test(img.public_id))
    //   // console.log(tlImages);
    //   // res.json(tlImages);
    //   return tlImages;
    // });
    // .catch(err => {
    //   console.log('ERROR:', err);
    //   next();
    // });
};

// 
const fetchCloudinaryImageData = (req, res, next) => {
  return Axios
    .all([fetchSubfolderNames(), fetchAll()])
    .then(Axios.spread(function(subfolders, images) {
      const [subfolderNames, tlImages] = [
        subfolders.data.folders,
        images.data.resources.filter(img => /^React-Timeline\//.test(img.public_id))
      ];
      res.json({ subfolderNames, tlImages });
    }))
    .catch(err => {
      console.log('Error:', err);
      next();
    });
};


module.exports = {
  addNewPhoto,
  serverSideCloudinaryUpload,
  fetchSubfolderNames,
  fetchAll,
  fetchCloudinaryImageData
};
