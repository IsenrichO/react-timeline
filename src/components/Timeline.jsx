'use strict';
import React, { Component } from 'react';
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
  (dispatch) => bindActionCreators({ logEventModalData, toggleEventModal }, dispatch)
)
export default class Timeline extends Component {
  constructor(props) {
    super(props);
    console.log('SEED DATA:', this.props.data);
    this.logModalData = this.logModalData.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.orderTimelineEvents = this.orderTimelineEvents.bind(this);
    this.renderOrderedEvents = this.renderOrderedEvents.bind(this);

    this.renderCU = this.renderCU.bind(this);

    this.toggleNewEvtModal = this.toggleNewEvtModal.bind(this);
    this.state = {
      newModal: false
    };
  }
  
  toggleModal() { this.props.toggleEventModal(); }
  
  toggleNewEvtModal() {
    console.log('new modal class method');
    this.setState({ newModal: !this.state.newModal });
  }

  logModalData(data) { this.props.logEventModalData(data); }

  orderTimelineEvents(evts) {
    return evts && evts.length
      ? evts
          .sort((evt1, evt2) => new Date(evt2.date).getTime() - new Date(evt1.date).getTime())
      : [];
  }

  componentDidMount() {
    this.renderCU();
  }

  renderCU() {
    // console.log('cloudinary');
    // cloudinary.cloudinary_js_config();

    // $(function() {
    //   if ($.fn.cloudinary_fileupload !== undefined) {
    //     $("input.cloudinary-fileupload[type=file]").cloudinary_fileupload();
    //   }
    // });

    // cloudinary.uploader.image_upload_tag('image_id', { callback: cloudinary_cors });
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
        logModalData={ this.logModalData }
        toggleModal={ this.toggleModal } />
    );
  }

  render() {
    return (
      <div>
        <div id="ccc">
          <input className="cloudinary-fileupload" type="file" name="file" data-cloudinary-field="image_upload" multiple />
          <button name="btn">TEST</button>
        </div>

        <ul className="tl">{ this.renderOrderedEvents(this.orderTimelineEvents(this.props.data)) }</ul>
        <EditEventModal
          modalData={ this.props.eventEditingModalData }
          modalStatus={ this.props.eventEditingModalState }
          toggleModal={ this.toggleModal } />
        <NewEventModal
          modalStatus={ this.state.newModal }
          toggleModal={ this.toggleNewEvtModal } />
        <ButtonControls
          toggleModal={ this.toggleNewEvtModal } />
      </div>
    );
  }
};
