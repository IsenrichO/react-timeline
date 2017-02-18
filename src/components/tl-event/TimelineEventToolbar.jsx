'use strict';
import React from 'react';
import { browserHistory, Router, Route, Link } from 'react-router';


const TimelineEventToolbar = ({ evt, logModalData, toggleModal, deleteEvt }) => (
  <div className="tl-toolbar">
    <button
      type="button"
      name="View full event"
      title="Show full note">
      <Link to={ `/events/edit/${evt.eventId}` }>
        <i className="glyphicon glyphicon-eye-open" />
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
    <button
      type="button"
      name="deleteEvtBtn"
      title="Delete this event from your timeline">
      <i
        className="glyphicon glyphicon-trash"
        onClick={ () => { deleteEvt(evt); } } />
    </button>
  </div>
);

export default TimelineEventToolbar;
