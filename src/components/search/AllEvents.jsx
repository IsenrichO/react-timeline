'use strict';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import SingleEvent from './SingleEvent';
import { updateSingleEvent } from '../../actions/asyncActions';
import Utils from '../../utilities/index';


@connect(
  ({ seedDataAggregator,
     eventEditingModalData, eventEditingModalState,
   }) => ({
    seedDataAggregator,
    eventEditingModalData,
    eventEditingModalState,
  }),
  (dispatch) => bindActionCreators({
    updateSingleEvent,
    push
  }, dispatch)
)
export default class AllEvents extends Component {
  constructor(props) {
    super(props);
  }

  renderAllEvents(evts) {
    return evts.map((evt, index) => (
      <SingleEvent
        { ...evt }
        key={ `EventCard_${index}` }
        addEventToFavorites={ () => Utils.addEventToFavorites(this.props.updateSingleEvent, evt) }
        getStarGlyphClass={ Utils.getStarGlyphClass(this.props.seedDataAggregator, evt.uuid) }
        hasMultipleTags={ Utils.hasMultipleTags(this.props.seedDataAggregator, evt.uuid) } />
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
