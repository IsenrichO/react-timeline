'use strict';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import EventEditingModalStyles from '../constants/json/EventEditingModalStyles.json';
import FileUploadAPI from './FileUploadAPI';
import { updateEvent } from '../actions/asyncActions';


@connect(
  state => ({
    eventEditingModalData: state.eventEditingModalData,
    eventEditingModalState: state.eventEditingModalState
  })
  // dispatch => bindActionCreators({
  //   updateEvent
  // }, dispatch)
)
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

  updateEvent(name, date, location, description) {
    console.log('\n\nMODAL DATA:', this.props.eventEditingModalData);
    const updatedData = {
      name: this.editEvtTitleInpt.value,
      date: this.editEvtDateInpt.value,
      location: this.editEvtLocationInpt.value,
      description: this.editEvtDescriptionInpt.value
    };

    const newEvtData = Object.assign({}, this.props.eventEditingModalData, updatedData);
    console.log('\n\nNEW EVENT DATA:', newEvtData);

    this.props.updEvt(newEvtData);
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

  componentWillReceiveProps(nextProps) {
    const self = this,
          editEvtDate = nextProps.eventEditingModalData.date;

    if (this.props.modalStatus !== nextProps.modalStatus && nextProps.modalStatus) {
      setTimeout(function() {
        self.editEvtDateInpt.valueAsDate = new Date(editEvtDate);
      }, 200);
    }
  }

  render() {
    const {
      name: evtName,
      date: evtDate,
      location: evtLocation,
      description: evtDescription
    } = this.props.eventEditingModalData;

    return (
      <Modal
        // contentLabel={ `EditEventModal_${this.props.modalData}` }
        contentLabel={ `EditEventModal_` }
        isOpen={ this.props.modalStatus }
        style={ EventEditingModalStyles }
        ref={ (editEventModal) => { this.editEventModal = editEventModal; }}>
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
                  id="edit-evt-title-inpt"
                  className="form-cont"
                  type="text"
                  ref={ (editEvtTitleInpt) => { this.editEvtTitleInpt = editEvtTitleInpt; }}
                  title="Add a name for this event"
                  defaultValue={ evtName }
                  required />
              </div>
            </fieldset>

            <fieldset>
              <div className="input-gr">
                <span className="input-gr-addon">
                  <i className="glyphicon glyphicon-calendar" />
                </span>
                <input
                  id="edit-evt-date-inpt"
                  className="form-cont"
                  type="date"
                  ref={ (editEvtDateInpt) => { this.editEvtDateInpt = editEvtDateInpt; }}
                  title="When did this event occur?" />
              </div>

              <div className="input-gr">
                <span className="input-gr-addon">
                  <i className="glyphicon glyphicon-map-marker" />
                </span>
                <input
                  id="edit-evt-location-inpt"
                  className="form-cont"
                  type="text"
                  ref={ (editEvtLocationInpt) => { this.editEvtLocationInpt = editEvtLocationInpt; }}
                  title="Include a location for this event?"
                  defaultValue={ evtLocation } />
              </div>
            </fieldset>

            <fieldset>
              <div className="input-gr">
                <span className="input-gr-addon">
                  <i className="glyphicon glyphicon-list-alt" />
                </span>
                <textarea
                  id="edit-evt-description-inpt"
                  className="form-cont"
                  ref={ (editEvtDescriptionInpt) => { this.editEvtDescriptionInpt = editEvtDescriptionInpt; }}
                  placeholder="Event description"
                  rows="4"
                  defaultValue={ evtDescription } />
              </div>
            </fieldset>
            <FileUploadAPI />
            <fieldset>
              <button
                type="button"
                name="updateEvtBtn"
                onClick={ ::this.updateEvent }>
                Update Event
              </button>
            </fieldset>
          </form>
        </div>
      </Modal>
    );
  }
};
