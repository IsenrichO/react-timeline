import React from 'react';

import BatchSelectCheckbox from '../../BatchSelectCheckbox';
import { classes, ClassNamesPropType } from 'aesthetic';
import { collapseBody } from '../../../utilities/utility_classes/general';
import SingleEvent from '../../search/SingleEvent';

// 
const TlEventItemActionControlPure = ({
  addSelectionToBatch,
  batchSelectionState,
  classNames,
  evtUuid,
  inverted,
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
        inverted && classNames.invertedActionControl,
      )}
      onClick={collapseBody}
    />
  );

export default TlEventItemActionControlPure;
