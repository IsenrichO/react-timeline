import React from 'react';
import PropTypes from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';
import FontIcon from 'material-ui/FontIcon';
import BatchSelectCheckbox from '../BatchSelectCheckbox';
// import SingleEvent from '../../search/SingleEvent';
import { collapseBody } from '../../../util/general';

//
const TlEventItemActionControlPure = ({
  addSelectionToBatch,
  classNames,
  evtUuid,
  isBatchSelectMode,
  isInverted,
}) => !!isBatchSelectMode
  ? (
    <BatchSelectCheckbox
      addSelectionToBatch={addSelectionToBatch}
      evtUuid={evtUuid}
      isInverted={isInverted}
    />
  ) : (
    <FontIcon
      className={classes(
        'material-icons',
        'tl-evt-hover-state',
        classNames.collapseUp,
        !!isInverted && classNames.invertedActionControl,
      )}
      onClick={collapseBody}
    >
      keyboard_arrow_up
    </FontIcon>
  );

TlEventItemActionControlPure.displayName = 'TlEventItemActionControl';

TlEventItemActionControlPure.propTypes = {
  addSelectionToBatch: PropTypes.func.isRequired,
  classNames: ClassNamesPropType.isRequired,
  evtUuid: PropTypes.string.isRequired,
  isBatchSelectMode: PropTypes.bool,
  isInverted: PropTypes.bool,
};

TlEventItemActionControlPure.defaultProps = {
  isBatchSelectMode: false,
  isInverted: false,
};

export default TlEventItemActionControlPure;
