'use strict';
import React from 'react';


const buttonsMap = (actions) => [{
    name: 'cancel-action',
    glyph: 'remove-circle',
    action: () => actions[0]()
  }, {
    name: 'batch-delete',
    glyph: 'trash',
    action: actions[1]
  }
];

const renderBatchActionButtons = (obj) => obj.map((action, index) =>
  <button
    key={ `batchActionBtn_${action.name}` }
    type="button"
    name={ `${action.name}-btn` }
    onClick={ action.action }>
    <i className={ `glyphicon glyphicon-${action.glyph}` } />
  </button>
);


const BatchActionButtons = ({ batchSelectionState, toggleBatchSelection, deleteBatch }) => {
  if (batchSelectionState) {
    return (
      <div>{ renderBatchActionButtons(buttonsMap([toggleBatchSelection, deleteBatch])) }</div>
    );
  } else {
    return null;
  }
};

export default BatchActionButtons;
