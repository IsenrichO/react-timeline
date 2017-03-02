'use strict';
import React from 'react';
import Utils from '../../utilities/index';


const TLEventHeader = ({ evtName, evtUuid, batchSelectionState, addSelectionToBatch, inverted }) => (
  <div className={ `panel-header${inverted ? ' inverted' : ''}` }>
    { Utils.renderItemActionControl(batchSelectionState, evtUuid, addSelectionToBatch) }
    <h3>{ evtName }</h3>
  </div>
);

export default TLEventHeader;
