'use strict';
import { LOAD_SEED_DATA, ADD_NEW_EVENT } from '../actions/types';


export default function seedDataAggregator(state = [], action = null) {
  switch (action.type) {
    case LOAD_SEED_DATA:
      console.log(`Action ${action.type} executed with payload `, action.payload);
      return action.payload;
    case ADD_NEW_EVENT:
      console.log(`Action ${action.type} executed with payload `, action.payload);
      return new Array(...state).concat(action.payload);
    default:
      return state;
  }
};
