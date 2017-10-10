import Axios from 'axios';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { Events, getEditEvent } from '../routing/RoutePaths';
import { crudAsync2 } from '../actions/asyncActions';

/* ACTION TYPES */
export const ADD_SINGLE_EVENT_SUCCESS = 'ADD_SINGLE_EVENT_SUCCESS';
export const DELETE_BATCH_EVENTS_SUCCESS = 'DELETE_BATCH_EVENTS_SUCCESS';
export const DELETE_SINGLE_EVENT_SUCCESS = 'DELETE_SINGLE_EVENT_SUCCESS';
export const FETCH_SEED_DATA_SUCCESS = 'FETCH_SEED_DATA_SUCCESS';
export const FETCH_STARRED_EVENTS_SUCCESS = 'FETCH_STARRED_EVENTS_SUCCESS';
export const UPDATE_EVENT_DATA = 'UPDATE_EVENT_DATA';

/* ACTION CREATORS */
export const onAddSingleEventSuccess = (payload) => ({
  payload,
  type: ADD_SINGLE_EVENT_SUCCESS,
});

export const onDeleteBatchEventsSuccess = (data) => ({
  payload: data,
  type: DELETE_BATCH_EVENTS_SUCCESS,
});

export const onDeleteSingleEventSuccess = (payload) => ({
  payload,
  type: DELETE_SINGLE_EVENT_SUCCESS,
});

export const onFetchSeedDataSuccess = (JSON) => ({
  payload: JSON,
  type: FETCH_SEED_DATA_SUCCESS,
});

export const onFetchStarredEventsSuccess = (data) => ({
  payload: data,
  type: FETCH_STARRED_EVENTS_SUCCESS,
});

export const onUpdateSingleEventSuccess = (payload) => ({
  payload,
  type: UPDATE_EVENT_DATA,
});

/* ASYNC ACTION CREATORS */
// 
export const addSingleEvent = (evtData) => (dispatch) =>
  crudAsync2(Axios.post, Events, dispatch, onAddSingleEventSuccess, evtData);

// 
export const deleteBatchEvents = (evts) => (dispatch) =>
  crudAsync2(Axios.delete, Events, dispatch, onDeleteBatchEventsSuccess, evts);

// 
export const deleteSingleEvt = (evt) => (dispatch) =>
  crudAsync2(Axios.delete, getEditEvent(evt.uuid), dispatch, onDeleteSingleEventSuccess, evt);

// 
export const updateSingleEvent = (evtData) => (dispatch) =>
  crudAsync2(Axios.put, getEditEvent(evtData.uuid), dispatch, onUpdateSingleEventSuccess, evtData);

/* REDUCER */
const initialState = [];

export default (state = initialState, action = null) => {
  let newState;
  switch (action.type) {
    case FETCH_SEED_DATA_SUCCESS:
      return action.payload;

    case ADD_SINGLE_EVENT_SUCCESS:
      return [...state, action.payload];

    case UPDATE_EVENT_DATA: {
      const updatedEvtIndex = state.findIndex((evt) => evt.uuid === action.payload.uuid);
      newState = Array.of(...state);
      newState.splice(updatedEvtIndex, 1);
      return [...newState, action.payload];
    }

    case DELETE_SINGLE_EVENT_SUCCESS: {
      const removedEvtUuid = state.findIndex((evt) => evt.uuid === action.payload);
      newState = Array.of(...state);
      newState.splice(removedEvtUuid, 1);
      return newState;
    }

    case DELETE_BATCH_EVENTS_SUCCESS:
      newState = Array
        .of(...state)
        .filter((evt) => !action.payload.includes(evt.uuid));
      return newState;

    case FETCH_STARRED_EVENTS_SUCCESS:
      // newState = Array
      //   .of(...state)
      //   .filter(evt => evt.starred === true);
      // return newState;

      // Break omitted

    default:
      return state;
  }
};

/* EXPORTS */
const SourceEventDataActionTypes = {
  ADD_SINGLE_EVENT_SUCCESS,
  DELETE_BATCH_EVENTS_SUCCESS,
  DELETE_SINGLE_EVENT_SUCCESS,
  FETCH_SEED_DATA_SUCCESS,
  FETCH_STARRED_EVENTS_SUCCESS,
  UPDATE_EVENT_DATA,
};
const SourceEventDataActionCreators = {
  addSingleEvent,
  deleteBatchEvents,
  deleteSingleEvt,
  onAddSingleEventSuccess,
  onDeleteBatchEventsSuccess,
  onDeleteSingleEventSuccess,
  onFetchSeedDataSuccess,
  onFetchStarredEventsSuccess,
  onUpdateSingleEventSuccess,
  updateSingleEvent,
};
const SourceEventDataActionCreatorPropTypes = PropTypes.shape({
  addSingleEvent: PropTypes.func,
  deleteBatchEvents: PropTypes.func,
  deleteSingleEvt: PropTypes.func,
  onAddSingleEventSuccess: PropTypes.func,
  onDeleteBatchEventsSuccess: PropTypes.func,
  onDeleteSingleEventSuccess: PropTypes.func,
  onFetchSeedDataSuccess: PropTypes.func,
  onFetchStarredEventsSuccess: PropTypes.func,
  onUpdateSingleEventSuccess: PropTypes.func,
  updateSingleEvent: PropTypes.func,
}).isRequired;
const SourceEventDataStatePropTypes = PropTypes.arrayOf(PropTypes.object);

export {
  SourceEventDataActionCreators,
  SourceEventDataActionCreatorPropTypes,
  SourceEventDataActionTypes,
  SourceEventDataStatePropTypes,
  initialState as SourceEventDataStateInitializer,
};
