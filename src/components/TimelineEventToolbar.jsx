'use strict';
import React from 'react';
import { browserHistory, Router, Route, Link } from 'react-router';


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
      <Link to={ `/notes/${evt.noteID}` }>
        <i
          className="glyphicon glyphicon-share-alt"
          // onClick={ () => {} }
          />
      </Link>
    </button>
  </div>
);

export default TimelineEventToolbar;
