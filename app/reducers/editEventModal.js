'use strict';
import { TOGGLE_EVENT_MODAL } from '../actions/index';


export default function eventEditingModalState(state = false, action) {
  switch (action.type) {
    case TOGGLE_EVENT_MODAL:
      console.log(`Action ${action.type} executed with empty payload!`);
      state = !state;
    default:
      return state;
  }
};
