'use strict';
import { TOGGLE_EVENT_MODAL } from '../actions/types';


export default function eventEditingModalState(state = false, action) {
  switch (action.type) {
    case TOGGLE_EVENT_MODAL:
      // console.log(`Action ${action.type} executed with empty payload!`);
      state = !state;
      
    default:
      // console.log(`Action <${action.type}> unrecognized. Falling back to original state.`);
      return state;
  }
};
