'use strict';
import React from 'react';
import Modal from 'react-modal';
import EventEditingModalStyles from '../constants/json/EventEditingModalStyles.json';


const ConfirmDeletionModal = ({ modalStatus, disableModal, confirmDeletionEvt, deleteEvt }) => (
  <Modal
    contentLabel={ `ConfirmDeletionModal_` }
    isOpen={ modalStatus }
    style={ EventEditingModalStyles }
    // ref={ (confirmDeleteModal) => { this.confirmDeleteModal = confirmDeleteModal; }}
    >
    <h5>Delete Event?</h5>
    <p>Are you sure you want to delete these events? This action cannot be undone.</p>
    <button
      type="button"
      name="cancelEvtConfirmBtn"
      onClick={ disableModal }>
      Cancel
    </button>
    <button
      type="button"
      name="deleteEvtConfirmBtn"
      onClick={ () => {
        deleteEvt();
        disableModal();
      }}>
      Delete
    </button>
  </Modal>
);

export default ConfirmDeletionModal;
