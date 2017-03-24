'use strict';
import React from 'react';
import Modal from 'react-modal';
import ConfirmationModalStyles from '../constants/json/ConfirmationModalStyles.json';


const ConfirmDeletionModal = ({ modalStatus, disableModal, confirmDeletionEvt, deleteEvt }) => (
  <Modal
    contentLabel={ `ConfirmDeletionModal_` }
    isOpen={ modalStatus }
    style={ ConfirmationModalStyles }>
    <form name="delete-confirmation-form">
      <h3>Delete Event?</h3>
      <p>Are you sure you want to delete these events?</p>
      <p className="warning-text">This action cannot be undone.</p>
      <button
        className="form-btn"
        type="button"
        name="cancelEvtConfirmBtn"
        onClick={ disableModal }>
        Cancel
      </button>
      <button
        className="form-btn"
        type="button"
        name="deleteEvtConfirmBtn"
        onClick={ () => {
          deleteEvt();
          disableModal();
        }}>
        Delete
      </button>
    </form>
  </Modal>
);

export default ConfirmDeletionModal;
