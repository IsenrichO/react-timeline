'use strict';
import React from 'react';


const BatchSelectCheckbox = ({ evtUuid, addSelectionToBatch }) => (
  <div className="checkbox">
    <input
      id={ `select-cb-${evtUuid}` }
      className="batch-select"
      type="checkbox"
      onClick={ () => addSelectionToBatch(evtUuid) } />
    <label htmlFor={ `select-cb-${evtUuid}` } />
  </div>
);

export default BatchSelectCheckbox;
