'use strict';
import React from 'react';
import { browserHistory, Router, Route, Link } from 'react-router';


const TimelineEventToolbar = ({ evt, logModalData, toggleModal }) => (
  <div className="tl-toolbar">
    <button
      type="button"
      name="View full event"
      title="Show full note">
      <Link to={ `/notes/${evt.noteID}` }>
        <i
          className="glyphicon glyphicon-eye-open" />
      </Link>
    </button>
    <button
      type="button"
      name="EditEventBtn"
      title="Enter quick edit mode">
      <i
        className="glyphicon glyphicon-pencil"
        onClick={ () => { logModalData(evt); toggleModal(); } } />
    </button>
    <button
      type="button"
      name="SocialShareBtn"
      title="Share to your social networks">
        <i
          className="glyphicon glyphicon-send"
          // onClick={ () => {} }
          />
    </button>
  </div>
);

export default TimelineEventToolbar;
