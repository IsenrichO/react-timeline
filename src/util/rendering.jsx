import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import { classes } from 'aesthetic';
import BatchSelectCheckbox from '../components/Atomic/BatchSelectCheckbox';
import { collapseBody } from './general';

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

/* COMPILED DEFAULT EXPORT */
export default {
  renderItemActionControl,
};
