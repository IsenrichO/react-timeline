'use strict';
import React from 'react';
import Utils from '../../utilities/index';


const urlBase = 'http://res.cloudinary.com/http-isenrich-io/image/upload/';
const TLEventHeader = ({ evtName, evtUuid, batchSelectionState, addSelectionToBatch, inverted, imageData }) => (
  <div
    className={ `panel-header${inverted ? ' inverted' : ''}` }
    style={{ backgroundImage: imageData ? `url(${urlBase}${imageData.public_id})` : 'none' }}>
    { Utils.renderItemActionControl(batchSelectionState, evtUuid, addSelectionToBatch) }
    <h3>{ evtName }</h3>
  </div>
);

export default TLEventHeader;
