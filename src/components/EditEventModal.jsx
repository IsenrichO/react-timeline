'use strict';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import EventEditingModalStyles from '../constants/json/EventEditingModalStyles.json';
import FileUploadAPI from './FileUploadAPI';
import { updateSingleEvent } from '../actions/asyncActions';

import GMap from './GMap';


@connect(
  state => ({
    eventEditingModalData: state.eventEditingModalData,
    eventEditingModalState: state.eventEditingModalState
  })
)
export default class EditEventModal extends Component {
  constructor(props) {
    super(props);
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

  updateSingleEvent(name, date, location, description) {
    const updatedData = {
      name: this.editEvtTitleInpt.value,
      date: this.editEvtDateInpt.value,
      location: this.editEvtLocationInpt.value,
      description: this.editEvtDescriptionInpt.value
    };
    const newEvtData = Object.assign({}, this.props.eventEditingModalData, updatedData);
    this.props.updEvt(newEvtData);
    this.props.toggleModal();
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
          <form id="edit-event-form" action="/api/photos" method="post" encType="multipart/form-data">
            <fieldset>
              <div className="input-gr">
                <span className="input-gr-addon">T</span>
                <label htmlFor="edit-evt-title-inpt" />
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
                <label htmlFor="edit-evt-date-inpt" />
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
                <label htmlFor="edit-evt-location-inpt" />
                <input
                  id="edit-evt-location-inpt"
                  className="form-cont"
                  type="text"
                  ref={ (editEvtLocationInpt) => { this.editEvtLocationInpt = editEvtLocationInpt; }}
                  title="Include a location for this event?"
                  defaultValue={ evtLocation } />
              </div>

              <GMap
                lat={ -34.397 }
                lng={ 150.644 } />
            </fieldset>

            <fieldset>
              <div className="input-gr">
                <span className="input-gr-addon">
                  <i className="glyphicon glyphicon-list-alt" />
                </span>
                <label htmlFor="edit-evt-description-inpt" />
                <textarea
                  id="edit-evt-description-inpt"
                  className="form-cont"
                  ref={ (editEvtDescriptionInpt) => { this.editEvtDescriptionInpt = editEvtDescriptionInpt; }}
                  placeholder="Event description"
                  rows="4"
                  defaultValue={ evtDescription } />
              </div>
            </fieldset>

            <fieldset>
              <div className="input-gr">
                <span className="input-gr-addon">
                  <i className="glyphicon glyphicon-tags" />
                </span>
                <label htmlFor="edit-evt-tags-inpt" />
                <div
                  id="tags-input-box"
                  className="form-cont"
                  ref={ (editEvtTagsInpt) => { this.editEvtTagsInpt = editEvtTagsInpt; }} />
              </div>
            </fieldset>

            <FileUploadAPI
              evt={ this.props.modalData }
              submittable={ true }
              uploadToCloudinary={ this.props.uploadToCloudinary } />

            <fieldset>
              <button
                className="form-btn"
                type="button"
                name="updateEvtBtn"
                onClick={ ::this.updateSingleEvent }>
                Update Event
              </button>
            </fieldset>
          </form>
        </div>
      </Modal>
    );
  }
};
