'use strict';
import React from 'react';
import Modal from 'react-modal';


const ConfirmDeletionModal = ({ modalStatus }) => (
  <Modal
    contentLabel={ `ConfirmDeletionModal_` }
    isOpen={ modalStatus }
    style={ EventEditingModalStyles }
    ref={ (newEventModal) => { this.newEventModal = newEventModal; }}>
    <h5>Delete Events&quest;</h5>
    <p>Are you sure you want to delete these events&quest; This action cannot be undone.</p>
  </Modal>
);

export default ConfirmDeletionModal;
