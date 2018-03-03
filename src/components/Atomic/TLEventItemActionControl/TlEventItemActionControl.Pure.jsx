import React                           from 'react';
import PropTypes                       from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';
import FontIcon                        from 'material-ui/Icon';
import BatchSelectCheckbox             from '../BatchSelectCheckbox';
// import SingleEvent from '../../search/SingleEvent';
import { collapseBody }                from '../../../util/general';

//
const TlEventItemActionControlPure = ({
  addSelectionToBatch,
  classNames,
  evtUuid,
  isBatchSelectMode,
  isInBatch,
  isInverted,
  withAlternation,
}) => !!isBatchSelectMode
  ? (
    <BatchSelectCheckbox
      addSelectionToBatch={addSelectionToBatch}
      evtUuid={evtUuid}
      isInBatch={isInBatch}
      isInverted={isInverted}
    />
  ) : (
    <FontIcon
      className={classes(
        classNames.eventHoverState, // Must be ordered before other classes
        'material-icons',
        classNames.collapseUp,
        !!isInverted && classNames.invertedActionControl,
        !withAlternation && classNames.actionControlForceAlignRight,
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
  isInBatch: PropTypes.bool,
  isInverted: PropTypes.bool,
  withAlternation: PropTypes.bool,
};

TlEventItemActionControlPure.defaultProps = {
  isBatchSelectMode: false,
  isInBatch: false,
  isInverted: false,
  withAlternation: true,
};

export default TlEventItemActionControlPure;
