import React from 'react';

const buttonsMap = [
  {
    name: 'cancel-action',
    glyph: 'remove-circle',
    tooltip: 'Cancel Action',
    action: (props) => {
      props.toggleBatchSelection();
      props.clearBatchSelection();
    }
  }, {
    name: 'batch-delete',
    glyph: 'trash',
    tooltip: 'Delete Items',
    action: (props) => {
      props.deleteBatchEvents(props.batchSelectionItems);
    }
  }
];

const renderBatchActionButtons = (btnsArr, props) => btnsArr.map((btn, index) =>
  <button
    key={ `batchActionBtn_${btn.name}` }
    className={classNames.batchActionBtns} // "batch-action-btns"
    type="button"
    name={ `${btn.name}-btn` }
    onClick={ () => btn.action(props) }
    disabled={ btn.name === 'batch-delete' && !props.batchSelectionItems.length ? true : false } >
    <i className={ `glyphicon glyphicon-${btn.glyph}` } />
    <div className="tooltip">
      <span>{ btn.tooltip }</span>
    </div>
  </button>
);


const BatchActionButtons = (props) => props.batchSelectionState
  ? (<div>{ renderBatchActionButtons(buttonsMap, props) }</div>)
  : null;

export default BatchActionButtons;
