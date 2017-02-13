'use strict';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import EventEditingModalStyles from '../constants/json/EventEditingModalStyles.json';
import FileUploadAPI from './FileUploadAPI';
import { addNewEvent } from '../actions/asyncActions';


// const saveNewEvt = () => {
//   let [];
// };

// isNewModal = true
// const NewEventModal = ({ modalStatus, toggleModal }) => (

// @connect(
//   null,
//   (dispatch) => bindActionCreators({ addNewEvent }, dispatch)
// )
export default class NewEventModal extends Component {
  constructor(props) {
    super(props);
    this.saveNewEvt = this.saveNewEvt.bind(this);
  }

  saveNewEvt(name, date, location, description) {
    console.log('saveNewEvt class method begun');
    let [$newEvtName, $newEvtDate, $newEvtLocation, $newEvtDescription] = [
      this.refs.newEvtTitle.value,
      this.refs.newEvtDate.value,
      this.refs.newEvtLocation.value,
      this.refs.newEvtDescription.value
    ];

    // this.props.addNewEvent($newEvtName, $newEvtDate, $newEvtLocation, $newEvtDescription);
    // this.props.dothis($newEvtName, $newEvtDate, $newEvtLocation, $newEvtDescription);
    this.props.adddder($newEvtName, $newEvtDate, $newEvtLocation, $newEvtDescription);
  }

  render() {
    return (
      <Modal
        ref="newEventModal"
        contentLabel={ `NewEventModal_` }
        isOpen={ this.props.modalStatus }
        style={ EventEditingModalStyles }>
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
                  ref="newEvtTitle"
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
                  ref="newEvtDate"
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
                  ref="newEvtLocation"
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
                  ref="newEvtDescription"
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
                onClick={ this.saveNewEvt }>
                Save
              </button>
            </fieldset>
          </form>
        </div>
      </Modal>
    );
  }
};

// export default NewEventModal;
