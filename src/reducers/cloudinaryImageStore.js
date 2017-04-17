'use strict';
import {
  FETCH_CLOUDINARY_IMAGES_SUCCESS,
  SET_BCKG_IMAGE
} from '../actions/types';


export default function cloudinaryImageStore(state = [], action = null) {
  switch (action.type) {

    case FETCH_CLOUDINARY_IMAGES_SUCCESS:
      // console.log(`Action <${action.type}> executed with payload`, action.payload);
      const { subfolderNames = [], tlImages } = action.payload;
      let foldersObj = subfolderNames.reduce((memo, curr) => {
        const regTest = new RegExp(`^${curr.path}`),
              images = tlImages.filter(img => regTest.test(img.public_id));
        memo[curr.name] = Object.assign({}, curr, { images });
        return memo;
      }, {});
      let newState = Object.assign({}, state, foldersObj);
      return newState;

    case SET_BCKG_IMAGE:
      // console.log(`Action <${action.type}> executed with payload`, action.payload);
      const folderPath = action.payload.replace(/^.+\/React-Timeline\/(.+)\/.+$/, '$1');
      const newFolderImages = state[folderPath].images.map(img => img.secure_url === action.payload
          ? Object.assign({}, img, { isHeroImg: true })
          : img);
      const newFolderPath = Object.assign({}, state[folderPath], { images: newFolderImages });
      let newState2 = Object.assign({}, state, { [folderPath]: newFolderPath });
      return newState2;

    default:
      // console.log(`Action <${action.type}> executed with payload`, action.payload);
      return state;
  }
};
