'use strict';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TimelineEvent from '../components/tl-event/TimelineEvent';
import EditEventModal from '../components/EditEventModal';
import NewEventModal from '../components/NewEventModal';
import ButtonControls from '../components/ButtonControls';
import BatchActionButtons from '../components/BatchActionButtons';
import { logEventModalData, toggleEventModal, allowBatchSelection, addEventToBatchSelection, clearBatchSelection } from '../actions/index';
import { addNewEvent, deleteSingleEvt, updateSingleEvent, deleteBatchEvents } from '../actions/asyncActions';
import Utils from '../utilities/index';


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
        deleteEvt={ () => this.props.deleteSingleEvt(evt) }
        batchSelectionState={ this.props.batchSelectionState }
        addSelectionToBatch={ (evtUuid) => this.props.addEventToBatchSelection(evtUuid) }
        addEventToFavorites={ () => Utils.addEventToFavorites(this.props.updateSingleEvent, evt) }
        getStarGlyphClass={ ::this.getStarGlyphClass(evt.eventId) }
        hasMultipleTags={ ::this.hasMultipleTags(evt.eventId) } />
    );
  }

  render() {
    return (
      <div>
        <ul className="tl">
          { ::this.renderOrderedEvents(Utils.orderTimelineEvents(this.props.seedData)) }
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
          deleteBatch={ ::this.deleteBatch }
          batchSelectionItems={ this.props.batchSelectionItems } />
        <ButtonControls
          toggleModal={ () => this.setState({ newModal: !this.state.newModal }) }
          toggleBatchSelection={ (bool = undefined) => this.props.allowBatchSelection(bool) } />
      </div>
    );
  }
};


// <div id="ccc">
//   <input className="cloudinary-fileupload" type="file" name="file" data-cloudinary-field="image_upload" multiple />
//   <button name="btn">TEST</button>
// </div>
