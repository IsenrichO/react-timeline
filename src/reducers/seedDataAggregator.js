'use strict';
import { LOAD_SEED_DATA } from '../actions/types';


export default function seedDataAggregator(state = [], action = null) {
  switch (action.type) {
    case LOAD_SEED_DATA:
      console.log(`Action ${action.type} executed with payload `, action.payload);
      return action.payload;
    default:
      return state;
  }
};
