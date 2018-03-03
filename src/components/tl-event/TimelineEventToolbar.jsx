import React                from 'react';
import PropTypes            from 'prop-types';
import { Link }             from 'react-router-dom';
import { tlEventPropTypes } from '~/util/TypeChecking';

const TimelineEventToolbarPure = ({
  confirmDeleteModal,
  confirmDeletionEvt,
  // deleteEvt,
  evt,
  logModalData,
  toggleModal,
}) => (
  <div className="tl-toolbar">
    <button
      name="View full event"
      title="Show full note"
      type="button"
    >
      <Link to={`/events/edit/${evt.uuid}`}>
        <i className="glyphicon glyphicon-eye-open" />
      </Link>
    </button>
    <button
      name="EditEventBtn"
      title="Enter quick edit mode"
      type="button"
    >
      <i
        className="glyphicon glyphicon-pencil"
        onClick={() => {
          logModalData(evt);
          toggleModal();
        }}
      />
    </button>
    <button
      name="SocialShareBtn"
      title="Share to your social networks"
      type="button"
    >
      <i
        className="glyphicon glyphicon-send"
        // onClick={ () => {} }
      />
    </button>
    <button
      name="deleteEvtBtn"
      title="Delete this event from your timeline"
      type="button"
    >
      <i
        className="glyphicon glyphicon-trash"
        onClick={() => {
          confirmDeletionEvt(evt);
          confirmDeleteModal();
          // deleteEvt(evt);
        }}
      />
    </button>
  </div>
);

TimelineEventToolbarPure.displayName = 'TimelineEventToolbarPure';

TimelineEventToolbarPure.propTypes = {
  confirmDeleteModal: PropTypes.func.isRequired,
  confirmDeletionEvt: PropTypes.func.isRequired,
  deleteEvt: PropTypes.func.isRequired,
  evt: tlEventPropTypes,
  logModalData: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

TimelineEventToolbarPure.defaultProp = {
  confirmDeleteModal() {},
  confirmDeletionEvt() {},
  deleteEvt() {},
  evt: {},
  logModalData() {},
  toggleModal() {},
};

export default TimelineEventToolbarPure;
