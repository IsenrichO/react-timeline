'use strict';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TimelineEvent from './TimelineEvent';
import EditEventModal from './EditEventModal';
import { logEventModalData, toggleEventModal } from '../actions/index';


class Timeline extends Component {
  constructor(props) {
    super(props);
    this.logModalData = this.logModalData.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.orderTimelineEvents = this.orderTimelineEvents.bind(this);
    this.renderOrderedEvents = this.renderOrderedEvents.bind(this);
  }
  
  toggleModal() { this.props.toggleEventModal(); }

  logModalData(data) { this.props.logEventModalData(data); }

  orderTimelineEvents(events) {
    return events && events.length
      ? events
          .sort((evt1, evt2) => new Date(evt2.date).getTime() - new Date(evt1.date).getTime())
      : [];
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
        evtNote={ evt.type }
        logModalData={ this.logModalData }
        toggleModal={ this.toggleModal } />
    );
  }

  render() {
    return (
      <div>
        <ul className="tl">{ this.renderOrderedEvents(this.orderTimelineEvents(this.props.data)) }</ul>
        <EditEventModal
          modalStatus={ this.props.eventEditingModalState }
          toggleModal={ this.toggleModal }
          modalData={ this.props.eventEditingModalData } />
      </div>
    );
  }
};

let mapStateToProps = (state) => ({
  eventEditingModalData: state.eventEditingModalData,
  eventEditingModalState: state.eventEditingModalState
});

let mapDispatchToProps = (dispatch) => bindActionCreators({
  logEventModalData,
  toggleEventModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
