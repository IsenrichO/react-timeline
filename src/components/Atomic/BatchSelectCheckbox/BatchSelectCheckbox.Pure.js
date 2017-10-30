import React from 'react';
import PropTypes from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';

const BatchSelectCheckboxPure = ({ addSelectionToBatch, classNames, evtUuid, isInBatch, isInverted }) => (
  <div
    className={classes(
      classNames.selectionCheckbox,
      !!isInverted && classNames.invertedCheckbox,
    )}
  >
    <input
      id={`select-cb-${evtUuid}`}
      checked={!!isInBatch}
      className={classNames.batchSelect}
      type="checkbox"
      onClick={() => addSelectionToBatch(evtUuid)}
    />
    <label htmlFor={`select-cb-${evtUuid}`} />
  </div>
);

BatchSelectCheckboxPure.displayName = 'BatchSelectCheckbox';

BatchSelectCheckboxPure.propTypes = {
  addSelectionToBatch: PropTypes.func.isRequired,
  classNames: ClassNamesPropType.isRequired,
  evtUuid: PropTypes.string.isRequired,
  isInBatch: PropTypes.bool,
  isInverted: PropTypes.bool,
};

BatchSelectCheckboxPure.defaultProps = {
  isInBatch: false,
  isInverted: false,
};

export default BatchSelectCheckboxPure;
