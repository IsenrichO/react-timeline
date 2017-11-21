import PropTypes from 'prop-types';
import update from 'immutability-helper';

/* ACTION TYPES */
const PREFIX = 'rt/timeline/modal/';
export const LOG_EVENT_MODAL_DATA = `${PREFIX}LOG_EVENT_MODAL_DATA`;
export const TOGGLE_EVENT_MODAL = `${PREFIX}TOGGLE_EVENT_MODAL`;

/* ACTION CREATORS */
export const logEventModalData = (payload) => ({
  payload,
  type: LOG_EVENT_MODAL_DATA,
});

export const toggleEventModal = () => ({
  type: TOGGLE_EVENT_MODAL,
});

/* REDUCER */
const initialState = {
  eventData: {
    date: new Date(),
    description: '',
    location: 'San Francisco, CA',
    name: '',
    type: 'General',
  },
  isModalOpen: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_EVENT_MODAL_DATA:
      return update(state, {
        eventData: { $set: action.payload },
      });

    case TOGGLE_EVENT_MODAL:
      return update(state, {
        isModalOpen: { $apply: (currVal) => !currVal },
      });

    default:
      return state;
  }
};

/* EXPORTS */
const EventModalActionTypes = {
  LOG_EVENT_MODAL_DATA,
  MODAL_PREFIX: PREFIX,
  TOGGLE_EVENT_MODAL,
};

const EventModalActionCreators = {
  logEventModalData,
  toggleEventModal,
};

const EventModalActionCreatorPropTypes = PropTypes.shape({
  logEventModalData: PropTypes.func,
  toggleEventModal: PropTypes.func,
}).isRequired;

const EventModalStatePropTypes = PropTypes.shape({
  eventData: PropTypes.shape({
    date: PropTypes.date,
    description: PropTypes.string,
    location: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }),
  isModalOpen: PropTypes.bool.isRequired,
});

export {
  EventModalActionCreators,
  EventModalActionCreatorPropTypes,
  EventModalActionTypes,
  EventModalStatePropTypes,
  initialState as EventModalStateInitializer,
};
