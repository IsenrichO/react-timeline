import React from 'react';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';

const BatchActionButtonsPure = ({ isBatchSelectMode, classNames, ...rest }) => {
  const buttonsMap = [{
    action(props) {
      props.toggleBatchSelection();
      props.clearBatchSelection();
    },
    glyph: 'remove-circle',
    name: 'cancel-action',
    tooltip: 'Cancel Action',
  }, {
    action(props) {
      return props.deleteBatchEvents(props.batchSelectionItems);
    },
    glyph: 'trash',
    name: 'batch-delete',
    tooltip: 'Delete Items',
  }];

  const renderBatchActionButtons = buttonsMap.map(({ action, glyph, name, tooltip }, index) => (
    <button
      key={`batchActionBtn_${name}`}
      className={classNames.batchActionBtns} // "batch-action-btns"
      type="button"
      name={`${name}-btn`}
      onClick={() => action(rest)}
      disabled={name === 'batch-delete' && !rest.batchSelectionItems.length ? true : false}
    >
      <i className={`glyphicon glyphicon-${glyph}`} />
      <div className="tooltip">
        <span>{tooltip}</span>
      </div>
    </button>
  ));

  return !!isBatchSelectMode
    ? (<div>{renderBatchActionButtons}</div>)
    : null;
};

BatchActionButtonsPure.displayName = 'BatchActionButtons';

BatchActionButtonsPure.propTypes = {
  classNames: ClassNamesPropType.isRequired,
  isBatchSelectMode: PropTypes.bool,
};

BatchActionButtonsPure.defaultProps = {
  isBatchSelectMode: false,
};

export default BatchActionButtonsPure;
