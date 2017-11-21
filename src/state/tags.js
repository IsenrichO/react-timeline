import Axios from 'axios';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { Tags } from '../routing/RoutePaths';
import { crudAsync2 } from '../actions/asyncActions';

/* ACTION TYPES */
const PREFIX = 'rt/timeline/tags/';
export const FETCH_ALL_EVENT_TAGS_SUCCESS = `${PREFIX}FETCH_ALL_EVENT_TAGS_SUCCESS`;

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
      return update(state, {
        $set: [...new Set(action.payload.map(({ name = '' }) => name))],
      });

    default:
      return state;
  }
};

/* EXPORTS */
const TagsActionTypes = {
  FETCH_ALL_EVENT_TAGS_SUCCESS,
  TAGS_PREFIX: PREFIX,
};

const TagsActionCreators = {
  fetchAllEventTags,
  onFetchAllEventTagsSuccess,
};

const TagsActionCreatorPropTypes = PropTypes.shape({
  fetchAllEventTags: PropTypes.func,
  onFetchAllEventTagsSuccess: PropTypes.func,
}).isRequired;

const TagsStatePropTypes = PropTypes.arrayOf(
  PropTypes.string,
);

export {
  TagsActionCreators,
  TagsActionCreatorPropTypes,
  TagsActionTypes,
  TagsStatePropTypes,
  initialState as TagsStateInitializer,
};
