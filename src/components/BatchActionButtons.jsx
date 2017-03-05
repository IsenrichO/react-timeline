'use strict';
import React from 'react';


const buttonsMap = (actions) => [{
    name: 'cancel-action',
    glyph: 'remove-circle',
    tooltip: 'Cancel Action',
    action: () => {
      actions[0]();
      actions[2]();
    }
  }, {
    name: 'batch-delete',
    glyph: 'trash',
    tooltip: 'Delete Items',
    action: actions[1]
  }
];

const renderBatchActionButtons = (obj, batch) => obj.map((action, index) =>
  <button
    key={ `batchActionBtn_${action.name}` }
    className="batch-action-btns"
    type="button"
    name={ `${action.name}-btn` }
    onClick={ action.action }
    disabled={ action.name === 'batch-delete' && !batch.length ? true : false } >
    <i className={ `glyphicon glyphicon-${action.glyph}` } />
    <div className="tooltip">
      <span>{ action.tooltip }</span>
    </div>
  </button>
);


const BatchActionButtons = ({ batchSelectionState, batchSelectionItems, toggleBatchSelection, deleteBatch, clearBatchSelection }) => {
  if (batchSelectionState) {
    return (
      <div>{ renderBatchActionButtons(buttonsMap([toggleBatchSelection, deleteBatch, clearBatchSelection]), batchSelectionItems) }</div>
    );
  } else {
    return null;
  }
};

export default BatchActionButtons;
