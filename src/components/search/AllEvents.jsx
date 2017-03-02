'use strict';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import SingleEvent from './SingleEvent';
import { fetchSeedData } from '../../actions/index';
import { addNewEvent, deleteSingleEvt, updateSingleEvent, deleteBatchEvents, fetchStarredEvents } from '../../actions/asyncActions';
import Utils from '../../utilities/index';


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
    fetchSeedData,
    updateSingleEvent,
    push
  }, dispatch)
)
export default class AllEvents extends Component {
  constructor(props) {
    super(props);
  }

  getStarGlyphClass(evtId) {
    const evt = this.props.seedDataAggregator.findIndex(evt => evt.eventId === evtId);
    return this.props.seedDataAggregator[evt].starred || null;
  }

  hasMultipleTags(evtId) {
    const evt = this.props.seedDataAggregator.findIndex(evt => evt.eventId === evtId);
    return this.props.seedDataAggregator[evt].tags.length > 1;
  }

  renderAllEvents(evts) {
    return evts.map((evt, index) => (
      <SingleEvent
        key={ `EventCard_${index}` }
        addEventToFavorites={ () => Utils.addEventToFavorites(this.props.updateSingleEvent, evt) }
        getStarGlyphClass={ ::this.getStarGlyphClass(evt.eventId) }
        hasMultipleTags={ ::this.hasMultipleTags(evt.eventId) }
        { ...evt } />
    ));
  }

  render() {
    const eventData = this.props.seedDataAggregator;
    return (
      <ul className="evt-search">
        { ::this.renderAllEvents(Utils.orderTimelineEvents(eventData)) }
      </ul>
    );
  }
};
