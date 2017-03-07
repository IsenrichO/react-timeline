'use strict';
import {
  FETCH_SEED_DATA_SUCCESS,
  ADD_SINGLE_EVENT_SUCCESS,
  DELETE_SINGLE_EVENT_SUCCESS,
  DELETE_BATCH_EVENTS_SUCCESS,
  UPDATE_EVENT_DATA,
  FETCH_STARRED_EVENTS_SUCCESS
} from '../actions/types';


export default function seedDataAggregator(state = [], action = null) {
  let newState;
  switch (action.type) {

    case FETCH_SEED_DATA_SUCCESS:
      // console.log(`Action <${action.type}> executed with payload `, action.payload);
      return action.payload;

    case ADD_SINGLE_EVENT_SUCCESS:
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

    case FETCH_STARRED_EVENTS_SUCCESS:
      // console.log(`Action <${action.type}> executed with payload `, action.payload);
      // newState = Array
      //   .of(...state)
      //   .filter(evt => evt.starred === true);
      // return newState;

    default:
      // console.log(`Action <${action.type}> unrecognized. Falling back to original state.`);
      return state;
  }
};
