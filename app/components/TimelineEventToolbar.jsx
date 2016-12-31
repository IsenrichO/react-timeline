'use strict';
import React from 'react';


const TimelineEventToolbar = ({ evt, logModalData, toggleModal }) => (
  <div className="tl-toolbar">
    <button
      type="button"
      name="EditEventBtn">
      <i
        className="glyphicon glyphicon-edit"
        onClick={ () => { logModalData(evt); toggleModal(); } } />
    </button>
    <button
      type="button"
      name="SocialShareBtn">
      <i className="glyphicon glyphicon-share-alt" />
    </button>
  </div>
);

export default TimelineEventToolbar;
