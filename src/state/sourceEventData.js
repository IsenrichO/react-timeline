import Axios from 'axios';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { Events, getEditEvent } from '../routing/RoutePaths';
import { crudAsync2 } from '../actions/asyncActions';
import { tlEventPropTypes } from '../util/TypeChecking';

/* ACTION TYPES */
const PREFIX = 'rt/timeline/source/';
export const ADD_SINGLE_EVENT_SUCCESS = `${PREFIX}ADD_SINGLE_EVENT_SUCCESS`;
export const DELETE_BATCH_EVENTS_SUCCESS = `${PREFIX}DELETE_BATCH_EVENTS_SUCCESS`;
export const DELETE_SINGLE_EVENT_SUCCESS = `${PREFIX}DELETE_SINGLE_EVENT_SUCCESS`;
export const FETCH_SEED_DATA_SUCCESS = `${PREFIX}FETCH_SEED_DATA_SUCCESS`;
export const FETCH_SINGLE_EVENT_SUCCESS = `${PREFIX}FETCH_SINGLE_EVENT_SUCCESS`;
export const FETCH_STARRED_EVENTS_SUCCESS = `${PREFIX}FETCH_STARRED_EVENTS_SUCCESS`;
export const UPDATE_EVENT_DATA = `${PREFIX}UPDATE_EVENT_DATA`;

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

export const onFetchSingleEventSuccess = (data) => ({
  payload: data,
  type: FETCH_SINGLE_EVENT_SUCCESS,
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
export const fetchSingleEvent = (eventId) => (dispatch) =>
  crudAsync2(Axios.get, getEditEvent(eventId), dispatch, onFetchSingleEventSuccess);

// 
export const updateSingleEvent = (evtData) => (dispatch) =>
  crudAsync2(Axios.put, getEditEvent(evtData.uuid), dispatch, onUpdateSingleEventSuccess, evtData);

/* REDUCER */
const initialState = {};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_SEED_DATA_SUCCESS:
      return action.payload;

    case ADD_SINGLE_EVENT_SUCCESS: {
      const { uuid } = action.payload;

      return update(state, {
        $merge: { [uuid]: action.payload },
      });
    }

    case DELETE_BATCH_EVENTS_SUCCESS: {
      const { payload: deletionUuids } = action;

      return update(state, {
        $unset: [deletionUuids].map((uuid) => uuid.toLowerCase()),
      });
    }

    case DELETE_SINGLE_EVENT_SUCCESS: {
      const { payload: deletionUuid } = action;

      return update(state, {
        $unset: [deletionUuid.toLowerCase()],
      });
    }

    case FETCH_SINGLE_EVENT_SUCCESS:
      return update(state, {
        $set: action.payload,
      });

    case UPDATE_EVENT_DATA: {
      const { uuid } = action.payload;

      return update(state, {
        [uuid]: { $merge: action.payload },
      });
    }

    case FETCH_STARRED_EVENTS_SUCCESS:
      // newState = Array
      //   .of(...state)
      //   .filter(({ starred }) => Boolean(starred));
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
  FETCH_SINGLE_EVENT_SUCCESS,
  FETCH_STARRED_EVENTS_SUCCESS,
  SOURCE_EVENTS_PREFIX: PREFIX,
  UPDATE_EVENT_DATA,
};

const SourceEventDataActionCreators = {
  addSingleEvent,
  deleteBatchEvents,
  deleteSingleEvt,
  fetchSingleEvent,
  onAddSingleEventSuccess,
  onDeleteBatchEventsSuccess,
  onDeleteSingleEventSuccess,
  onFetchSeedDataSuccess,
  onFetchSingleEventSuccess,
  onFetchStarredEventsSuccess,
  onUpdateSingleEventSuccess,
  updateSingleEvent,
};

const SourceEventDataActionCreatorPropTypes = PropTypes.shape({
  addSingleEvent: PropTypes.func,
  deleteBatchEvents: PropTypes.func,
  deleteSingleEvt: PropTypes.func,
  fetchSingleEvent: PropTypes.func,
  onAddSingleEventSuccess: PropTypes.func,
  onDeleteBatchEventsSuccess: PropTypes.func,
  onDeleteSingleEventSuccess: PropTypes.func,
  onFetchSeedDataSuccess: PropTypes.func,
  onFetchSingleEventSuccess: PropTypes.func,
  onFetchStarredEventsSuccess: PropTypes.func,
  onUpdateSingleEventSuccess: PropTypes.func,
  updateSingleEvent: PropTypes.func,
}).isRequired;

const SourceEventDataStatePropTypes = PropTypes.objectOf(
  tlEventPropTypes,
);

export {
  SourceEventDataActionCreators,
  SourceEventDataActionCreatorPropTypes,
  SourceEventDataActionTypes,
  SourceEventDataStatePropTypes,
  initialState as SourceEventDataStateInitializer,
};
