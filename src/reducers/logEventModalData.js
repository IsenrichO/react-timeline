'use strict';
import { LOG_EVENT_MODAL_DATA } from '../actions/types';


const DefaultState = {
  name: '',
  type: 'General',
  description: '',
  location: 'San Francisco, CA',
  date: new Date()
};

export default function eventEditingModalData(state = DefaultState, action) {
  switch (action.type) {
    case LOG_EVENT_MODAL_DATA:
      // console.log(`Action ${action.type} executed with payload `, action.payload);
      return Object.assign({}, action.payload);
    default:
      return state;
  }
};
