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
import { addNewEvent, deleteSingleEvt, updateSingleEvent, deleteBatchEvents } from '../actions/asyncActions';
import * as Utils from '../Utilities';


@connect(
  ({ seedDataAggregator,
     eventEditingModalData, eventEditingModalState,
     batchSelectionState, batchSelectionItems
   }) => ({
    seedDataAggregator,
    eventEditingModalData,
    eventEditingModalState,
    batchSelectionState,
    batchSelectionItems
  }),
  (dispatch) => bindActionCreators({
    logEventModalData,
    toggleEventModal,
    allowBatchSelection,
    addEventToBatchSelection,
    addNewEvent,
    deleteSingleEvt,
    deleteBatchEvents,
    updateSingleEvent,
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

  getStarGlyphClass(evtId) {
    const evt = this.props.seedDataAggregator.findIndex(evt => evt.eventId === evtId);
    return this.props.seedDataAggregator[evt].starred || null;
  }

  hasMultipleTags(evtId) {
    const evt = this.props.seedDataAggregator.findIndex(evt => evt.eventId === evtId);
    return this.props.seedDataAggregator[evt].tags.length > 1;
  }

  orderTimelineEvents(evts) {
    return evts && evts.length
      ? evts.sort((evt1, evt2) => Utils.getTimeDifferenceInMs(evt2.date, evt1.date))
      : [];
  }

  deleteBatch() {
    this.props.deleteBatchEvents(this.props.batchSelectionItems);
    this.props.clearBatchSelection();
  }

  addEventToFavorites(evt) {
    console.log('event:', evt);
    this.props.updateSingleEvent({
      eventId: evt.eventId,
      uuid: evt.uuid,
      starred: !evt.starred ? true : false
    });
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
        addSelectionToBatch={ (evtUuid) => this.props.addEventToBatchSelection(evtUuid) }
        addEventToFavorites={ (evt) => ::this.addEventToFavorites(evt) }
        getStarGlyphClass={ ::this.getStarGlyphClass(evt.eventId) }
        hasMultipleTags={ ::this.hasMultipleTags(evt.eventId) } />
    );
  }

  render() {
    return (
      <div>
        <div id="ccc">
          <input className="cloudinary-fileupload" type="file" name="file" data-cloudinary-field="image_upload" multiple />
          <button name="btn">TEST</button>
        </div>

        <ul className="tl">
          { ::this.renderOrderedEvents(::this.orderTimelineEvents(this.props.seedData)) }
        </ul>
        
        <EditEventModal
          modalData={ this.props.eventEditingModalData }
          modalStatus={ this.props.eventEditingModalState }
          toggleModal={ ::this.toggleModal }
          updEvt={ (evtData) => this.props.updateSingleEvent(evtData) } />
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
