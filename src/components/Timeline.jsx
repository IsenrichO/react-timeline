'use strict';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TimelineEvent from './tl-event/TimelineEvent';
import EditEventModal from './EditEventModal';
import NewEventModal from './NewEventModal';
import ButtonControls from './ButtonControls';
import BatchActionButtons from './BatchActionButtons';
import { logEventModalData, toggleEventModal, allowBatchSelection, addEventToBatchSelection, clearBatchSelection } from '../actions/index';
import { addNewEvent, deleteSingleEvt, updateEvent, deleteBatchEvents } from '../actions/asyncActions';
import * as Utils from '../Utilities';


@connect(
  (state) => ({
    eventEditingModalData: state.eventEditingModalData,
    eventEditingModalState: state.eventEditingModalState,
    batchSelectionState: state.batchSelectionState,
    batchSelectionItems: state.batchSelectionItems
  }),
  (dispatch) => bindActionCreators({
    logEventModalData,
    toggleEventModal,
    allowBatchSelection,
    addEventToBatchSelection,
    addNewEvent,
    deleteSingleEvt,
    deleteBatchEvents,
    updateEvent,
    clearBatchSelection
  }, dispatch)
)
export default class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newModal: false
    };
  }

  static propTypes = {
    seedData: PropTypes.array.isRequired
  };
  
  toggleModal() {
    this.props.toggleEventModal();
    !this.props.eventEditingModalState
      ? $('body').addClass('modal-active')
      : $('body').removeClass('modal-active');
  }
  
  // toggleNewEvtModal() {
  //   this.setState({ newModal: !this.state.newModal });
  // }

  // logModalData(data) { this.props.logEventModalData(data); }

  orderTimelineEvents(evts) {
    return evts && evts.length
      ? evts.sort((evt1, evt2) => Utils.getTimeDifferenceInMs(evt2.date, evt1.date))
      : [];
  }

  deleteBatch() {
    this.props.deleteBatchEvents(this.props.batchSelectionItems);
    this.props.clearBatchSelection();
  }

  renderOrderedEvents(events) {
    return events.map((evt, index) =>
      <TimelineEvent
        key={ `Evt${evt.name}${index}` }
        evt={ evt }
        evtName={ evt.name }
        evtLocation={ evt.location }
        evtAlign={ new Array('', '-invert')[index % 2] }
        evtDescription={ evt.description }
        evtDate={ evt.date }
        evtFormattedDate={ evt.formattedDate }
        evtNote={ evt.type }
        photoCount={ evt.photoCount }
        logModalData={ (data) => this.props.logEventModalData(data) }
        toggleModal={ ::this.toggleModal }
        deleteEvt={ (evt) => this.props.deleteSingleEvt(evt) }
        batchSelectionState={ this.props.batchSelectionState }
        addSelectionToBatch={ (evtUuid) => this.props.addEventToBatchSelection(evtUuid) } />
    );
  }

  render() {
    return (
      <div>
        <div id="ccc">
          <input className="cloudinary-fileupload" type="file" name="file" data-cloudinary-field="image_upload" multiple />
          <button name="btn">TEST</button>
          <button
            name="del-btn"
            onClick={ ::this.deleteBatch }>
            DELETE
          </button>
        </div>

        <ul className="tl">
          { ::this.renderOrderedEvents(::this.orderTimelineEvents(this.props.seedData)) }
        </ul>
        
        <EditEventModal
          modalData={ this.props.eventEditingModalData }
          modalStatus={ this.props.eventEditingModalState }
          toggleModal={ ::this.toggleModal }
          updEvt={ (evtData) => this.props.updateEvent(evtData) } />
        <NewEventModal
          modalStatus={ this.state.newModal }
          toggleModal={ () => this.setState({ newModal: !this.state.newModal }) }
          addNewEvent={ (evtData) => this.props.addNewEvent(evtData) } />
        <BatchActionButtons
          batchSelectionState={ this.props.batchSelectionState }
          toggleBatchSelection={ (bool = undefined) => this.props.allowBatchSelection(bool) }
          deleteBatch={ ::this.deleteBatch } />
        <ButtonControls
          toggleModal={ () => this.setState({ newModal: !this.state.newModal }) }
          toggleBatchSelection={ (bool = undefined) => this.props.allowBatchSelection(bool) } />
      </div>
    );
  }
};
