'use strict';
import { FETCH_ALL_EVENT_TAGS_SUCCESS } from '../actions/types';


export default function eventTags(state = [], action = null) {
  switch(action.type) {
    case FETCH_ALL_EVENT_TAGS_SUCCESS:
      console.log(`Action <${action.type}> executed with payload`, action.payload);
      console.log([...new Set(action.payload.map(tag => tag.name))]);
      return [...new Set(action.payload.map(tag => tag.name))];

    default:
      return state;
  }
};
