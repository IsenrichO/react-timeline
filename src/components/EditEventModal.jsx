'use strict';
import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';
import EventEditingModalStyles from '../constants/json/EventEditingModalStyles.json';
import FileUploadAPI from './FileUploadAPI';


export default class EditEventModal extends Component {
  constructor(props) {
    super(props);
    this.constructCurrentFormattedDate = this.constructCurrentFormattedDate.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  static propTypes = {
    modalData: PropTypes.object,
    modalStatus: PropTypes.bool,
    toggleModal: PropTypes.func
  };

  constructCurrentFormattedDate() {
    const DATE = new Date();
    return `${DATE.getUTCMonth() + 1}/${DATE.getUTCDate()}/${DATE.getUTCFullYear()}`;
  }

  // <label htmlFor="title-inpt">Title</label>
  // <label htmlFor="date-inpt">Date</label>
  // <label htmlFor="location-inpt">Location</label>
  // <label htmlFor="description-inpt">Description</label>
  renderForm() {
    let form = (
      <form>
        <fieldset>
          <div className="input-group">
            <span className="input-group-addon">T</span>
            <input
              id="title-inpt"
              className="form-control"
              type="text"
              defaultValue={ this.props.modalData.name }
              // defaultValue={ this.props.modalData ? this.props.modalData.name : 'Working Title' }
              required />
          </div>
        </fieldset>

        <fieldset>
          <label htmlFor="date-inpt">Date</label>
          <input
            id="date-inpt"
            type="date"
            // defaultValue={ this.props.modalData ? this.props.modalData.date : this.constructCurrentFormattedDate() }
            defaultValue={ this.props.modalData.date } />

          <label htmlFor="location-inpt">Location</label>
          <input
            id="location-inpt"
            type="text"
            // defaultValue={ this.props.modalData ? this.props.modalData.location : 'Oklahoma City, OK' }
            defaultValue={ this.props.modalData.location } />
        </fieldset>

        <fieldset>
          <label htmlFor="description-inpt">Description</label>
          <textarea
            id="description-inpt"
            placeholder="Event description"
            // defaultValue={ this.props.modalData ? this.props.modalData.description : 'Event description' }
            defaultValue={ this.props.modalData.description } />
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
        ref="editEventModal"
        contentLabel={ `EditEventModal_${this.props.modalData}` }
        isOpen={ this.props.modalStatus }
        style={ EventEditingModalStyles }>
        <div className="modal-wrapper">
          <i
            className="close-btn"
            onClick={ this.props.toggleModal }>
            &times;
          </i>
          <form id="edit-event-form">
            <fieldset>
              <div className="input-gr">
                <span className="input-gr-addon">T</span>
                <input
                  id="title-inpt"
                  className="form-cont"
                  type="text"
                  title="Add a name for this event"
                  defaultValue={ this.props.modalData ? this.props.modalData.name : 'Working Title' }
                  // defaultValue={ this.props.modalData.name }
                  required />
              </div>
            </fieldset>

            <fieldset>
              <div className="input-gr">
                <span className="input-gr-addon">
                  <i className="glyphicon glyphicon-calendar" />
                </span>
                <input
                  id="date-inpt"
                  className="form-cont"
                  type="date"
                  title="When did this event occur?"
                  defaultValue={ this.props.modalData ? this.props.modalData.date : this.constructCurrentFormattedDate() } />
              </div>

              <div className="input-gr">
                <span className="input-gr-addon">
                  <i className="glyphicon glyphicon-map-marker" />
                </span>
                <input
                  id="location-inpt"
                  className="form-cont"
                  type="text"
                  title="Include a location for this event?"
                  defaultValue={ this.props.modalData ? this.props.modalData.location : 'Oklahoma City, OK' } />
              </div>
            </fieldset>

            <fieldset>
              <div className="input-gr">
                <span className="input-gr-addon">
                  <i className="glyphicon glyphicon-list-alt" />
                </span>
                <textarea
                  id="description-inpt"
                  className="form-cont"
                  placeholder="Event description"
                  rows="4"
                  defaultValue={ this.props.modalData ? this.props.modalData.description : 'Event description' } />
              </div>
            </fieldset>
            <FileUploadAPI />
          </form>
        </div>
      </Modal>
    );
  }
};
