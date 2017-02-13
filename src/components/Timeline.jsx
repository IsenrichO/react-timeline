'use strict';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TimelineEvent from './tl-event/TimelineEvent';
import EditEventModal from './EditEventModal';
import ButtonControls from './ButtonControls';
import NewEventModal from './NewEventModal';
import { logEventModalData, toggleEventModal } from '../actions/index';
import { addNewEvent } from '../actions/asyncActions';


@connect(
  (state) => ({
    eventEditingModalData: state.eventEditingModalData,
    eventEditingModalState: state.eventEditingModalState
  }),
  (dispatch) => bindActionCreators({
    logEventModalData,
    toggleEventModal,
    addNewEvent
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
  
  toggleNewEvtModal() {
    this.setState({ newModal: !this.state.newModal });
  }

  logModalData(data) { this.props.logEventModalData(data); }

  adddder(evtData) {
    this.props.addNewEvent(evtData);
  }

  orderTimelineEvents(evts) {
    return evts && evts.length ? 
      evts.sort((evt1, evt2) => new Date(evt2.date).getTime() - new Date(evt1.date).getTime()) :
      [];
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
        logModalData={ ::this.logModalData }
        toggleModal={ ::this.toggleModal } />
    );
  }

  render() {
    return (
      <div>
        <div id="ccc">
          <input className="cloudinary-fileupload" type="file" name="file" data-cloudinary-field="image_upload" multiple />
          <button name="btn">TEST</button>
        </div>

        <ul className="tl">{ ::this.renderOrderedEvents(::this.orderTimelineEvents(this.props.seedData)) }</ul>
        <EditEventModal
          modalData={ this.props.eventEditingModalData }
          modalStatus={ this.props.eventEditingModalState }
          toggleModal={ ::this.toggleModal } />
        <NewEventModal
          modalStatus={ this.state.newModal }
          toggleModal={ ::this.toggleNewEvtModal }
          adddder={ ::this.adddder } />
        <ButtonControls
          toggleModal={ ::this.toggleNewEvtModal } />
      </div>
    );
  }
};
