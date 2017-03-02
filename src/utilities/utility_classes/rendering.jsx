'use strict';
import React from 'react';
import BatchSelectCheckbox from '../../components/BatchSelectCheckbox';
import { collapseBody } from './general';


// 
const renderItemActionControl = (bool, evtUuid, func) => bool
  ? (
    <BatchSelectCheckbox
      evtUuid={ evtUuid }
      addSelectionToBatch={ func } />
  ) : (
    <i 
      className="collapse-up glyphicon glyphicon-chevron-up"
      onClick={ collapseBody } />    
  );


const RenderingUtils = {
  renderItemActionControl
};

export default RenderingUtils;
