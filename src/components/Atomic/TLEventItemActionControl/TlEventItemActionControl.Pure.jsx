import React from 'react';
import PropTypes from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';
import FontIcon from 'material-ui/FontIcon';
import BatchSelectCheckbox from '../../BatchSelectCheckbox';
// import SingleEvent from '../../search/SingleEvent';
import { collapseBody } from '../../../utilities/utility_classes/general';

//
const TlEventItemActionControlPure = ({
  addSelectionToBatch,
  batchSelectionState,
  classNames,
  evtUuid,
  isInverted,
}) => batchSelectionState
  ? (
    <BatchSelectCheckbox
      addSelectionToBatch={addSelectionToBatch}
      evtUuid={evtUuid}
    />
  ) : (
    <i
      className={classes(
        'glyphicon',
        'glyphicon-chevron-up',
        'tl-evt-hover-state',
        classNames.collapseUp,
        !!isInverted && classNames.invertedActionControl,
      )}
      onClick={collapseBody}
    />
  );

TlEventItemActionControlPure.displayName = 'TlEventItemActionControl';

TlEventItemActionControlPure.propTypes = {
  addSelectionToBatch: PropTypes.func.isRequired,
  batchSelectionState: PropTypes.bool,
  classNames: ClassNamesPropType.isRequired,
  evtUuid: PropTypes.string.isRequired,
  isInverted: PropTypes.bool,
};

TlEventItemActionControlPure.defaultProps = {
  batchSelectionState: false,
  isInverted: false,
};

export default TlEventItemActionControlPure;
