import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { isNil } from 'lodash';
import { onDeleteBatchEventsSuccess, DELETE_BATCH_EVENTS_SUCCESS } from './sourceEventData';

/* ACTION TYPES */
export const ADD_EVENT_TO_BATCH = 'ADD_EVENT_TO_BATCH';
export const ALLOW_BATCH_SELECTION = 'ALLOW_BATCH_SELECTION';
export const CLEAR_BATCH = 'CLEAR_BATCH';

/* ACTION CREATORS */
export const addEventToBatchSelection = (evtUuid) => ({
  evtUuid,
  type: ADD_EVENT_TO_BATCH,
});

export const allowBatchSelection = (shouldEnable = undefined) => ({
  shouldEnable,
  type: ALLOW_BATCH_SELECTION,
});

export const clearBatchSelection = () => ({
  type: CLEAR_BATCH,
});

/* REDUCER */
const initialState = {
  isEnabled: false,
  items: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_EVENT_TO_BATCH: {
      const { items } = state;
      const evtUuid = action.evtUuid.toLowerCase();

      return items.includes(evtUuid)
        ? update(state, {
          items: {
            $splice: [[items.findIndex((item) => item === evtUuid), 1]],
          },
        })
        : update(state, {
          items: { $push: [evtUuid] },
        });

      // if (items.includes(payload)) {
      //   const newState = Array.of(...state);
      //   const removalIndex = state.findIndex((evt) => evt === action.payload);
      //   newState.splice(removalIndex, 1);

      //   return newState;
      // }

      return update(state, {
        items: { $push: [evtUuid] },
      });
    }

    case ALLOW_BATCH_SELECTION: {
      const { shouldEnable } = action;

      return update(state, {
        isEnabled: { $apply: (currVal) => isNil(shouldEnable)
          ? !currVal
          : !!shouldEnable,
        },
      });
    }

    case CLEAR_BATCH:
    case DELETE_BATCH_EVENTS_SUCCESS:
      return update(state, {
        isEnabled: { $set: false },
        items: { $set: [] },
      });

    default:
      return state;
  }
};

/* EXPORTS */
const BatchSelectActionTypes = {
  ADD_EVENT_TO_BATCH,
  ALLOW_BATCH_SELECTION,
  CLEAR_BATCH,
  DELETE_BATCH_EVENTS_SUCCESS,
};
const BatchSelectActionCreators = {
  addEventToBatchSelection,
  allowBatchSelection,
  clearBatchSelection,
  onDeleteBatchEventsSuccess,
};
const BatchSelectActionCreatorPropTypes = PropTypes.shape({
  addEventToBatchSelection: PropTypes.func,
  allowBatchSelection: PropTypes.func,
  clearBatchSelection: PropTypes.func,
  onDeleteBatchEventsSuccess: PropTypes.func,
}).isRequired;
const BatchSelectStatePropTypes = PropTypes.shape({
  isEnabled: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
}).isRequired;

export {
  BatchSelectActionCreators,
  BatchSelectActionCreatorPropTypes,
  BatchSelectActionTypes,
  BatchSelectStatePropTypes,
  initialState as BatchSelectStateInitializer,
};