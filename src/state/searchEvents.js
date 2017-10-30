import PropTypes from 'prop-types';
import Axios from 'axios';
import update from 'immutability-helper';
import { RecentlyModifiedEvents, StarredEvents } from '../routing/RoutePaths';
import { onFetchStarredEventsSuccess, FETCH_STARRED_EVENTS_SUCCESS } from './sourceEventData';
import { crudAsync2 } from '../actions/asyncActions';

/* ACTION TYPES */
export const FETCH_ALL_EVENTS_SUCCESS = 'FETCH_ALL_EVENTS_SUCCESS';
export const FETCH_RECENTLY_MODIFIED_EVENTS_SUCCESS = 'FETCH_RECENTLY_MODIFIED_EVENTS_SUCCESS';

/* ACTION CREATORS */
export const onFetchAllEventsSuccess = (data) => ({
  payload: data,
  type: FETCH_ALL_EVENTS_SUCCESS,
});

export const onFetchRecentlyModifiedEventsSuccess = (data) => ({
  payload: data,
  type: FETCH_RECENTLY_MODIFIED_EVENTS_SUCCESS,
});

/* ASYNC ACTION CREATORS */
// 
export const fetchStarredEvents = () => (dispatch) =>
  crudAsync2(Axios.get, StarredEvents, dispatch, onFetchStarredEventsSuccess);

// 
export const fetchRecentlyModifiedEvents = () => (dispatch) =>
  crudAsync2(Axios.get, RecentlyModifiedEvents, dispatch, onFetchRecentlyModifiedEventsSuccess);

/* REDUCER */
const initialState = {
  all: [],
  recent: [],
  starred: [],
};

export default (state = initialState, action = null) => {
  switch (action.type) {
    case FETCH_ALL_EVENTS_SUCCESS:
      return update(state, {
        all: { $set: action.payload },
      });

    case FETCH_RECENTLY_MODIFIED_EVENTS_SUCCESS:
      return update(state, {
        recent: { $set: action.payload },
      });

    case FETCH_STARRED_EVENTS_SUCCESS:
      return update(state, {
        starred: { $set: action.payload },
      });

    default:
      return state;
  }
};

/* EXPORTS */
const SearchEventsActionTypes = {
  FETCH_ALL_EVENTS_SUCCESS,
  FETCH_RECENTLY_MODIFIED_EVENTS_SUCCESS,
};
const SearchEventsActionCreators = {
  fetchRecentlyModifiedEvents,
  fetchStarredEvents,
  onFetchAllEventsSuccess,
  onFetchRecentlyModifiedEventsSuccess,
  onFetchStarredEventsSuccess,
};
const SearchEventsActionCreatorPropTypes = PropTypes.shape({
  fetchRecentlyModifiedEvents: PropTypes.func,
  fetchStarredEvents: PropTypes.func,
  onFetchAllEventsSuccess: PropTypes.func,
  onFetchRecentlyModifiedEventsSuccess: PropTypes.func,
  onFetchStarredEventsSuccess: PropTypes.func,
}).isRequired;
const SearchEventsStatePropTypes = PropTypes.shape({
  all: PropTypes.arrayOf(PropTypes.object),
  recent: PropTypes.arrayOf(PropTypes.object),
  starred: PropTypes.arrayOf(PropTypes.object),
});

export {
  SearchEventsActionCreators,
  SearchEventsActionCreatorPropTypes,
  SearchEventsActionTypes,
  SearchEventsStatePropTypes,
  initialState as SearchEventsStateInitializer,
};
