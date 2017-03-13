'use strict';
import { FETCH_CLOUDINARY_IMAGES } from '../actions/types';


export default function cloudinaryImageStore(state = [], action = null) {
  switch (action.type) {

    case FETCH_CLOUDINARY_IMAGES:
      console.log(`Action <${action.type}> executed with payload`, action.payload);
      return action.payload.resources;

    default:
      console.log(`Action <${action.type}> executed with payload`, action.payload);
      return state;

  }
};
