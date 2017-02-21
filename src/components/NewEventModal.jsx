'use strict';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import EventEditingModalStyles from '../constants/json/EventEditingModalStyles.json';
import FileUploadAPI from './FileUploadAPI';
import { addNewEvent } from '../actions/asyncActions';


export default class NewEventModal extends Component {
  constructor(props) {
    super(props);
  }

  saveNewEvt(name, date, location, description) {
    this.props.addNewEvent({
      name: this.newEvtTitleInpt.value,
      date: this.newEvtDateInpt.value,
      location: this.newEvtLocationInpt.value,
      description: this.newEvtDescriptionInpt.value
    });
    this.props.toggleModal();
  }

  componentWillReceiveProps(nextProps) {
    const self = this;
    if (this.props.modalStatus !== nextProps.modalStatus && nextProps.modalStatus) {
      setTimeout(function() {
        self.newEvtDateInpt.valueAsDate = new Date();
      }, 200);
    }
  }

  render() {
    return (
      <Modal
        contentLabel={ `NewEventModal_` }
        isOpen={ this.props.modalStatus }
        style={ EventEditingModalStyles }
        ref={ (newEventModal) => { this.newEventModal = newEventModal; }}>
        <div className="modal-wrapper">
          <i
            className="close-btn"
            onClick={ this.props.toggleModal }>
            &times;
          </i>
          <form id="new-event-form">
            <fieldset>
              <div className="input-gr">
                <span className="input-gr-addon">T</span>
                <input
                  id="new-evt-title-inpt"
                  className="form-cont"
                  type="text"
                  ref={ (newEvtTitleInpt) => { this.newEvtTitleInpt = newEvtTitleInpt; }}
                  title="Add a name for this event"
                  // defaultValue={ this.props.modalData ? this.props.modalData.name : 'Working Title' }
                  required />
              </div>
            </fieldset>

            <fieldset>
              <div className="input-gr">
                <span className="input-gr-addon">
                  <i className="glyphicon glyphicon-calendar" />
                </span>
                <input
                  id="new-evt-date-inpt"
                  className="form-cont"
                  type="date"
                  ref={ (newEvtDateInpt) => { this.newEvtDateInpt = newEvtDateInpt; }}
                  title="When did this event occur?"
                  // defaultValue={ this.props.modalData ? this.props.modalData.date : this.constructCurrentFormattedDate() }
                  />
              </div>

              <div className="input-gr">
                <span className="input-gr-addon">
                  <i className="glyphicon glyphicon-map-marker" />
                </span>
                <input
                  id="new-evt-location-inpt"
                  className="form-cont"
                  type="text"
                  ref={ (newEvtLocationInpt) => { this.newEvtLocationInpt = newEvtLocationInpt; }}
                  title="Include a location for this event?"
                  // defaultValue={ this.props.modalData ? this.props.modalData.location : 'Oklahoma City, OK' }
                  />
              </div>
            </fieldset>

            <fieldset>
              <div className="input-gr">
                <span className="input-gr-addon">
                  <i className="glyphicon glyphicon-list-alt" />
                </span>
                <textarea
                  id="new-evt-description-inpt"
                  className="form-cont"
                  ref={ (newEvtDescriptionInpt) => { this.newEvtDescriptionInpt = newEvtDescriptionInpt; }}
                  placeholder="Event description"
                  rows="4"
                  // defaultValue={ this.props.modalData ? this.props.modalData.description : 'Event description' }
                  />
              </div>
            </fieldset>
            <FileUploadAPI />
            <fieldset>
              <button
                type="button"
                name="saveNewEvtBtn"
                onClick={ ::this.saveNewEvt }>
                Save
              </button>
            </fieldset>
          </form>
        </div>
      </Modal>
    );
  }
};
