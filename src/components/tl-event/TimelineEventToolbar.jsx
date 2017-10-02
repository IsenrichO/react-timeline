import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const TimelineEventToolbar = ({
  confirmDeleteModal,
  confirmDeletionEvt,
  // deleteEvt,
  evt,
  logModalData,
  toggleModal,
}) => (
  <div className="tl-toolbar">
    <button
      type="button"
      name="View full event"
      title="Show full note">
      <Link to={ `/events/edit/${evt.uuid}` }>
        <i className="glyphicon glyphicon-eye-open" />
      </Link>
    </button>
    <button
      type="button"
      name="EditEventBtn"
      title="Enter quick edit mode">
      <i
        className="glyphicon glyphicon-pencil"
        onClick={ () => {
          logModalData(evt);
          toggleModal();
        }}
      />
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
        onClick={ () => {
          confirmDeletionEvt(evt);
          confirmDeleteModal();
          // deleteEvt(evt); }
        }}
      />
    </button>
  </div>
);

TimelineEventToolbar.propTypes = {
  confirmDeleteModal: PropTypes.func.isRequired,
  confirmDeletionEvt: PropTypes.func.isRequired,
  deleteEvt: PropTypes.func.isRequired,
  evt: PropTypes.object,
  logModalData: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

TimelineEventToolbar.defaultProp = {
  confirmDeleteModal() {},
  confirmDeletionEvt() {},
  deleteEvt() {},
  evt: {},
  logModalData() {},
  toggleModal() {},
};

export default TimelineEventToolbar;
