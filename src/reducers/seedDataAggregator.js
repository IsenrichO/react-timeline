'use strict';
import { LOAD_SEED_DATA, ADD_NEW_EVENT_DATA, DELETE_SINGLE_EVENT, UPDATE_EVENT_DATA } from '../actions/types';


export default function seedDataAggregator(state = [], action = null) {
  let newState;
  switch (action.type) {
    case LOAD_SEED_DATA:
      console.log(`Action <${action.type}> executed with payload `, action.payload);
      return action.payload;
    case ADD_NEW_EVENT_DATA:
      console.log(`Action <${action.type}> executed with payload `, action.payload);
      return new Array(...state).concat(action.payload);
    case DELETE_SINGLE_EVENT:
      console.log(`Action <${action.type}> executed with payload `, action.payload);
      const removedEvtUuid = state.findIndex(evt => evt.uuid === action.payload.uuid);
      newState = new Array(...state);
      newState.splice(removedEvtUuid, 1);
      return newState;
    case UPDATE_EVENT_DATA:
      console.log(`Action <${action.type}> executed with payload `, action.payload);
      const updatedEvtIndex = state.findIndex(evt => evt.uuid === action.payload.uuid);
      newState = Array.of(...state);
      newState.splice(updatedEvtIndex, 1);
      return newState.concat(action.payload);
    default:
      return state;
  }
};
