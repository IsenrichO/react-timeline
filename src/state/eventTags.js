import Axios from 'axios';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { Tags } from '../routing/RoutePaths';
import { crudAsync2 } from '../actions/asyncActions';

/* ACTION TYPES */
export const FETCH_ALL_EVENT_TAGS_SUCCESS = 'FETCH_ALL_EVENT_TAGS_SUCCESS';

/* ACTION CREATORS */
export const onFetchAllEventTagsSuccess = (payload) => ({
  payload,
  type: FETCH_ALL_EVENT_TAGS_SUCCESS,
});

/* ASYNC ACTION CREATORS */
// 
export const fetchAllEventTags = (...args) => (dispatch) =>
  crudAsync2(Axios.get, Tags, dispatch, onFetchAllEventTagsSuccess);

/* REDUCER */
const initialState = [];

export default (state = initialState, action = null) => {
  switch (action.type) {
    case FETCH_ALL_EVENT_TAGS_SUCCESS:
      return [...new Set(action.payload.map(({ name = '' }) => name))];

    default:
      return state;
  }
};

/* EXPORTS */
const EventTagsActionTypes = {
  FETCH_ALL_EVENT_TAGS_SUCCESS,
};

const EventTagsActionCreators = {
  fetchAllEventTags,
  onFetchAllEventTagsSuccess,
};

const EventTagsActionCreatorPropTypes = PropTypes.shape({
  fetchAllEventTags: PropTypes.func,
  onFetchAllEventTagsSuccess: PropTypes.func,
}).isRequired;

const EventTagsStatePropTypes = PropTypes.arrayOf(PropTypes.string);

export {
  EventTagsActionCreators,
  EventTagsActionCreatorPropTypes,
  EventTagsActionTypes,
  EventTagsStatePropTypes,
  initialState as EventTagsStateInitializer,
};
