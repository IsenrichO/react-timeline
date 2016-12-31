'use strict';
import React from 'react';


const TimelineEventToolbar = ({ evt, logModalData, toggleModal }) => (
  <div className="tl-toolbar">
    <button>
      <i
        className="glyphicon glyphicon-edit"
        onClick={ () => { logModalData(evt); toggleModal(); } } />
    </button>
    <button>
      <i className="glyphicon glyphicon-share-alt" />
    </button>
  </div>
);

export default TimelineEventToolbar;
