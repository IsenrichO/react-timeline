'use strict';
import React from 'react';
import Modal from 'react-modal';


export default class EditEventModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal>
        <i
          className="close-btn"
          onClick={ this.closeModal }>
          &times;
        </i>
      </Modal>
    );
  }
};
