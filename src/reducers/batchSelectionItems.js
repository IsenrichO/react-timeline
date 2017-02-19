'use strict';
import { ADD_EVENT_TO_BATCH, CLEAR_BATCH } from '../actions/types';


export default function batchSelectionItems(state = [], action = null) {
  switch (action.type) {
    case ADD_EVENT_TO_BATCH:
      console.log(`Action <${action.type}> executed with payload `, action.payload);
      if (state.includes(action.payload)) {
        let newState = Array.of(...state),
            removalIndex = state.findIndex(evt => evt === action.payload);
        newState.splice(removalIndex, 1);
        return newState;
      }
      return state.concat(action.payload);
    case CLEAR_BATCH:
      console.log(`Action <${action.type}> executed with empty payload.`);
      state = [];
    default:
      return state;
  }
};
