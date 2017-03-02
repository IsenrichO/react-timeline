'use strict';
import { LOAD_SEED_DATA, ADD_NEW_EVENT_DATA, DELETE_SINGLE_EVENT_SUCCESS, DELETE_BATCH_EVENTS_SUCCESS, UPDATE_EVENT_DATA } from '../actions/types';


export default function seedDataAggregator(state = [], action = null) {
  let newState;
  switch (action.type) {

    case LOAD_SEED_DATA:
      // console.log(`Action <${action.type}> executed with payload `, action.payload);
      return action.payload;

    case ADD_NEW_EVENT_DATA:
      // console.log(`Action <${action.type}> executed with payload `, action.payload);
      return [...state, action.payload];

    case UPDATE_EVENT_DATA:
      // console.log(`Action <${action.type}> executed with payload `, action.payload);
      const updatedEvtIndex = state.findIndex(evt => evt.uuid === action.payload.uuid);
      newState = Array.of(...state);
      newState.splice(updatedEvtIndex, 1);
      return [...newState, action.payload];

    case DELETE_SINGLE_EVENT_SUCCESS:
      // console.log(`Action <${action.type}> executed with payload `, action.payload);
      const removedEvtUuid = state.findIndex(evt => evt.uuid === action.payload);
      newState = Array.of(...state);
      newState.splice(removedEvtUuid, 1);
      return newState;

    case DELETE_BATCH_EVENTS_SUCCESS:
      // console.log(`Action <${action.type}> executed with payload `, action.payload);
      newState = Array
        .of(...state)
        .filter(evt => !action.payload.includes(evt.uuid));
      return newState;

    default:
      return state;
  }
};
