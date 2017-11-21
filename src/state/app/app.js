import PropTypes from 'prop-types';
import { isNil } from 'lodash';
import update from 'immutability-helper';

/* ACTION TYPES */
const PREFIX = 'rt/timeline/app/';
export const COLLAPSE_SEARCH_SIDEBAR = `${PREFIX}COLLAPSE_SEARCH_SIDEBAR`;

/* ACTION CREATORS */
export const collapseSearchSidebar = (shouldCollapse) => ({
  payload: { shouldCollapse },
  type: COLLAPSE_SEARCH_SIDEBAR,
});

/* REDUCER */
const initialState = {
  isSearchSidebarOpen: true,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case COLLAPSE_SEARCH_SIDEBAR: {
      const { shouldCollapse } = action.payload;

      return update(state, isNil(shouldCollapse)
        ? { $toggle: ['isSearchSidebarOpen'] }
        : { isSearchSidebarOpen: { $set: !!shouldCollapse } },
      );
    }

    default:
      return state;
  }
};

/* EXPORTS */
const AppActionTypes = {
  APP_PREFIX: PREFIX,
  COLLAPSE_SEARCH_SIDEBAR,
};

const AppActionCreators = {
  collapseSearchSidebar,
};

const AppActionCreatorPropTypes = PropTypes.shape({
  collapseSearchSidebar: PropTypes.func.isRequired,
}).isRequired;

const AppStatePropTypes = PropTypes.shape({
  isSearchSidebarOpen: PropTypes.bool.isRequired,
}).isRequired;

export {
  AppActionCreators,
  AppActionCreatorPropTypes,
  AppActionTypes,
  AppStatePropTypes,
  initialState as AppStateInitializer,
};
