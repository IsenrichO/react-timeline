'use strict';
import { FETCH_CLOUDINARY_IMAGES_SUCCESS } from '../actions/types';


export default function cloudinaryImageStore(state = [], action = null) {
  switch (action.type) {

    case FETCH_CLOUDINARY_IMAGES_SUCCESS:
      console.log(`Action <${action.type}> executed with payload`, action.payload);
      const { subfolderNames = [], tlImages } = action.payload;
      console.log('SUB-FOLDERNAMES:', subfolderNames, tlImages);
      let foldersObj = subfolderNames.reduce((memo, curr) => {
        const regTest = new RegExp(`^${curr.path}`),
              images = tlImages.filter(img => regTest.test(img.public_id));
        memo[curr.name] = Object.assign({}, curr, { images });
        return memo;
      }, {});
      let newState = Object.assign({}, state, foldersObj);
      console.log('newState:', newState);
      return newState;

    default:
      console.log(`Action <${action.type}> executed with payload`, action.payload);
      return state;

  }
};
