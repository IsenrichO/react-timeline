import PropTypes from 'prop-types';
import update from 'immutability-helper';

/* ACTION TYPES */
const PREFIX = 'rt/event/editor/';
export const UPDATE_EVENT_RICH_TEXT = `${PREFIX}UPDATE_EVENT_RICH_TEXT`;

/* ACTION CREATORS */
export const updateRichText = (textBody = '') => ({
  payload: { textBody },
  type: UPDATE_EVENT_RICH_TEXT,
});

/* REDUCER */
const initialState = {
  textBody: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_EVENT_RICH_TEXT: {
      const { textBody } = action.payload;

      return update(state, {
        textBody: { $set: textBody },
      });
    }

    default:
      return state;
  }
};

/* EXPORTS */
const EventEditorActionTypes = {
  EVENT_EDITOR_PREFIX: PREFIX,
  UPDATE_EVENT_RICH_TEXT,
};

const EventEditorActionCreators = {
  updateRichText,
};

const EventEditorActionCreatorPropTypes = PropTypes.shape({
  updateRichText: PropTypes.func.isRequired,
}).isRequired;

const EventEditorStatePropTypes = PropTypes.shape({
  textBody: PropTypes.string.isRequired,
}).isRequired;

export {
  EventEditorActionCreators,
  EventEditorActionCreatorPropTypes,
  EventEditorActionTypes,
  EventEditorStatePropTypes,
  initialState as EventEditorStateInitializer,
};
