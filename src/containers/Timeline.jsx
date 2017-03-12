'use strict';
import Axios from 'axios';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TimelineEvent from '../components/tl-event/TimelineEvent';
import EditEventModal from '../components/EditEventModal';
import NewEventModal from '../components/NewEventModal';
import ButtonControls from '../components/ButtonControls';
import BatchActionButtons from '../components/BatchActionButtons';
import ConfirmDeletionModal from '../components/ConfirmDeletionModal';
import { logEventModalData, toggleEventModal, allowBatchSelection, addEventToBatchSelection, clearBatchSelection } from '../actions/index';
import { addSingleEvent, deleteSingleEvt, updateSingleEvent, deleteBatchEvents, fetchCloudinaryImageData } from '../actions/asyncActions';
import Utils from '../utilities/index';

import CloudinaryUploader from '../CloudinaryUploadAPI';


@connect(
  ({ seedDataAggregator,
     eventEditingModalData, eventEditingModalState,
     batchSelectionState, batchSelectionItems,
     cloudinaryImageStore
   }) => ({
    seedDataAggregator,
    eventEditingModalData,
    eventEditingModalState,
    batchSelectionState,
    batchSelectionItems,
    cloudinaryImageStore
  }),
  (dispatch) => bindActionCreators({
    logEventModalData,
    toggleEventModal,
    allowBatchSelection,
    addEventToBatchSelection,
    addSingleEvent,
    deleteSingleEvt,
    deleteBatchEvents,
    updateSingleEvent,
    clearBatchSelection,
    fetchCloudinaryImageData
  }, dispatch)
)
export default class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newModal: false,
      confirmModal: false,
      confirmationEvt: null
    };
  }

  static propTypes = {
    seedData: PropTypes.array.isRequired
  };
  
  componentDidMount() {
    this.props.fetchCloudinaryImageData('Unsigned');
  }

  cacheInLocalStorage(data) {
    for (let key in data) {
      window.localStorage.set('uuid', JSON.stringify(data[key]));
    }
  }

  toggleModal() {
    this.props.toggleEventModal();
    !this.props.eventEditingModalState
      ? $('body').addClass('modal-active')
      : $('body').removeClass('modal-active');
  }

  // An alternative class method for toggling the modal display, here wrapped in
  //  a Window timer. This could be useful as a callback for deactivating the modal
  //  while allowing said modal to undergo a CSS animation out of frame.
  toggleModalWithDelay() {
    setTimeout(() => {
      this.props.toggleEventModal();
      !this.props.eventEditingModalState
        ? $('body').addClass('modal-active')
        : $('body').removeClass('modal-active');
    }, 1200);
  }

  confirmDeletionEvt(confirmationEvt) {
    this.setState({ confirmationEvt });
  }

  renderOrderedEvents(events) {
    let imageStore = this.props.cloudinaryImageStore;
    return events.map((evt, index) => {
      let attrs;
      if (index < imageStore.length) {
        attrs = { imageData: imageStore[index] };
      }
      return (
        <TimelineEvent
          evt={{ ...evt }}
          key={ `Evt${evt.name}${index}` }
          evtAlign={ new Array('', '-invert')[index % 2] }
          logModalData={ (data) => this.props.logEventModalData(data) }
          toggleModal={ ::this.toggleModal }
          deleteEvt={ () => this.props.deleteSingleEvt(evt) }
          confirmDeleteModal={ () => this.setState({ confirmModal: true }) }
          confirmDeletionEvt={ ::this.confirmDeletionEvt }
          batchSelectionState={ this.props.batchSelectionState }
          addSelectionToBatch={ (evtUuid) => this.props.addEventToBatchSelection(evtUuid) }
          isInBatch={ this.props.batchSelectionItems.includes(evt.uuid) }
          addEventToFavorites={ () => Utils.addEventToFavorites(this.props.updateSingleEvent, evt) }
          getStarGlyphClass={ Utils.getStarGlyphClass(this.props.seedDataAggregator, evt.uuid) }
          hasMultipleTags={ Utils.hasMultipleTags(this.props.seedDataAggregator, evt.uuid) }
          inverted={ index % 2 ? true : false }
          { ...attrs } />
      );
    });
  }

  render() {
    return (
      <div>
        <CloudinaryUploader />

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
          addSingleEvent={ (evtData) => this.props.addSingleEvent(evtData) } />
        <BatchActionButtons
          batchSelectionState={ this.props.batchSelectionState }
          batchSelectionItems={ this.props.batchSelectionItems }
          toggleBatchSelection={ (bool = undefined) => this.props.allowBatchSelection(bool) }
          deleteBatchEvents={ this.props.deleteBatchEvents }
          clearBatchSelection={ this.props.clearBatchSelection } />
        <ButtonControls
          toggleModal={ () => this.setState({ newModal: !this.state.newModal }) }
          toggleBatchSelection={ (bool = undefined) => this.props.allowBatchSelection(bool) } />
        <ConfirmDeletionModal
          modalStatus={ this.state.confirmModal }
          disableModal={ () => this.setState({ confirmModal: !this.state.confirmModal }) }
          // confirmDeletionEvt={ this.state.confirmDeletionEvt }
          deleteEvt={ () => this.props.deleteSingleEvt(this.state.confirmationEvt) } />
      </div>
    );
  }
};


// <div id="ccc">
//   <input className="cloudinary-fileupload" type="file" name="file" data-cloudinary-field="image_upload" multiple />
//   <button name="btn">TEST</button>
// </div>
