import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import { classes } from 'aesthetic';
import SingleEvent from '../../components/search/SingleEvent';
import BatchSelectCheckbox from '../../components/BatchSelectCheckbox';
import { addEventToFavorites, collapseBody, getStarGlyphClass, hasMultipleTags } from './general';

//
const renderItemActionControl = (hasSelectionState, evtUuid, callback) => hasSelectionState ? (
  <BatchSelectCheckbox
    addSelectionToBatch={callback}
    evtUuid={evtUuid}
  />
) : (
  <FontIcon
    className={classes('material-icons')}
    // "collapse-up glyphicon glyphicon-chevron-up"
    onClick={collapseBody}
  >
    keyboard_arrow_up
  </FontIcon>
);

renderItemActionControl.displayName = 'ItemActionControl';

renderItemActionControl.propTypes = {
  callback: PropTypes.func,
  evtUuid: PropTypes.string.isRequired,
  hasSelectionState: PropTypes.bool,
};

renderItemActionControl.defaultProps = {
  callback: Function.prototype,
  hasSelectionState: false,
};

//
const renderStarredEvents = (evts, eventsStore, updateSingleEvent, imageStore) => evts.map((evt, index) => (
  <SingleEvent
    key={`SearchEventCard${evt.uuid}`}
    addEventToFavorites={() => addEventToFavorites(updateSingleEvent, evt)}
    evt={evt}
    getStarGlyphClass={getStarGlyphClass(eventsStore, evt.uuid)}
    hasMultipleTags={hasMultipleTags(eventsStore, evt.uuid)}
    imageStore={imageStore[evt.uuid]}
  />
));

/* EXPORT */
export default {
  renderItemActionControl,
  renderStarredEvents,
};
