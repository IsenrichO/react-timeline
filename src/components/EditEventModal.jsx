'use strict';
import React from 'react';
import Modal from 'react-modal';

import EventEditingModalStyles from '../constants/json/EventEditingModalStyles.json';
import FileUploadAPI from './FileUploadAPI';


export default class EditEventModal extends React.Component {
  constructor(props) {
    super(props);
    this.constructCurrentFormattedDate = this.constructCurrentFormattedDate.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  constructCurrentFormattedDate() {
    const DATE = new Date();
    return `${DATE.getUTCMonth() + 1}/${DATE.getUTCDate()}/${DATE.getUTCFullYear()}`;
  }

  renderForm() {
    let form = (
      <form>
        <fieldset>
          <label htmlFor="title-inpt">Title</label>
          <input
            id="title-inpt"
            type="text"
            defaultValue={ this.props.modalData ? this.props.modalData.name : 'Working Title' }
            required />
        </fieldset>

        <fieldset>
          <label htmlFor="date-inpt">Date</label>
          <input
            id="date-inpt"
            type="date"
            defaultValue={ this.props.modalData ? this.props.modalData.date : this.constructCurrentFormattedDate() } />

          <label htmlFor="location-inpt">Location</label>
          <input
            id="location-inpt"
            type="text"
            defaultValue={ this.props.modalData ? this.props.modalData.location : 'Oklahoma City, OK' } />
        </fieldset>

        <fieldset>
          <label htmlFor="description-inpt">Description</label>
          <textarea
            id="description-inpt"
            placeholder="Event description"
            defaultValue={ this.props.modalData ? this.props.modalData.description : 'Event description' } />
        </fieldset>

        <fieldset id="editing-modal-pics">
          <div
            className="dropzone"
            onDrop={ this.handleFileSelect }
            onDragEnter={ this.handleDragEnter }
            onDragOver={ this.handleDragOver }>
            <p>Drop Your Images Here!</p>
          </div>
          <input
            id="file-upload-btn"
            type="file"
            name="files[]"
            accept="image/*"
            onChange={ this.loadSelectedImages }
            multiple />
          <output
            htmlFor="file-upload-btn"
            ref="fileContainer">
          </output>
        </fieldset>
      </form>
    );
    return form;
  }

  componentDidMount() {
    // this.renderForm();
  }

  render() {
    return (
      <Modal
        ref="eventModal"
        contentLabel={ `EditEventModal_${this.props.modalData}` }
        isOpen={ this.props.modalStatus }
        style={ EventEditingModalStyles }>
        <i
          className="close-btn"
          onClick={ this.props.toggleModal }>
          &times;
        </i>
        <form id="edit-event-form">
          <fieldset>
            <label htmlFor="title-inpt">Title</label>
            <input
              id="title-inpt"
              type="text"
              defaultValue={ this.props.modalData ? this.props.modalData.name : 'Working Title' }
              required />
          </fieldset>

          <fieldset>
            <label htmlFor="date-inpt">Date</label>
            <input
              id="date-inpt"
              type="date"
              defaultValue={ this.props.modalData ? this.props.modalData.date : this.constructCurrentFormattedDate() } />

            <label htmlFor="location-inpt">Location</label>
            <input
              id="location-inpt"
              type="text"
              defaultValue={ this.props.modalData ? this.props.modalData.location : 'Oklahoma City, OK' } />
          </fieldset>

          <fieldset>
            <label htmlFor="description-inpt">Description</label>
            <textarea
              id="description-inpt"
              placeholder="Event description"
              defaultValue={ this.props.modalData ? this.props.modalData.description : 'Event description' } />
          </fieldset>
          <FileUploadAPI />
        </form>
      </Modal>
    );
  }
};


// TimelineEvent Component props:   evt, evtName, evtLocation, evtAlign, evtDescription, evtNote,
//        SEED_DATA Input Fields:      , name   ,    location,         , description   , type, date
