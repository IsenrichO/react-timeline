'use strict';
import {
  FETCH_ALL_EVENTS_SUCCESS,
  FETCH_RECENTLY_MODIFIED_EVENTS_SUCCESS,
  FETCH_STARRED_EVENTS_SUCCESS
} from '../actions/types';


export default function searchEvents(state = [], action = null) {
  switch(action.type) {

    case FETCH_ALL_EVENTS_SUCCESS:
    case FETCH_RECENTLY_MODIFIED_EVENTS_SUCCESS:
    case FETCH_STARRED_EVENTS_SUCCESS:
      // console.log(`Action <${action.type}> executed with payload `, action.payload);
      return action.payload;

    default:
      // console.log(`Action <${action.type}> unrecognized. Falling back to original state.`);
      return state;
  }
};
