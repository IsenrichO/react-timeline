import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import SingleEvent from './SingleEvent';
import { updateSingleEvent as UpdateSingleEvent } from '../../state/sourceEventData';
import Utils from '../../util';

@connect(
  ({ eventEditingModalData, eventEditingModalState, seedDataAggregator }) => ({
    eventEditingModalData,
    eventEditingModalState,
    seedDataAggregator,
  }),
  (dispatch) => bindActionCreators({
    push,
    updateSingleEvent: UpdateSingleEvent,
  }, dispatch),
)
export default class AllEvents extends Component {
  static displayName = 'SearchAllEvents';

  static propTypes = {
    seedDataAggregator: PropTypes.arrayOf(PropTypes.object),
    updateSingleEvent: PropTypes.func.isRequired,
  };

  static defaultProps = {
    seedDataAggregator: [],
  };

  constructor(props) {
    super(props);

    this.renderAllEvents = ::this.renderAllEvents;
  }

  renderAllEvents(evts) {
    const { seedDataAggregator, updateSingleEvent } = this.props;

    return evts.map((evt, index) => (
      <SingleEvent
        {...evt}
        key={`EventCard${evt.uuid}`}
        addEventToFavorites={() => Utils.addEventToFavorites(updateSingleEvent, evt)}
        hasMultipleTags={Utils.hasMultipleTags(seedDataAggregator, evt.uuid)}
      />
    ));
  }

  render() {
    const { seedDataAggregator: eventData } = this.props;

    return (
      <ul className="evt-search">
        {this.renderAllEvents(Utils.orderTimelineEvents(eventData))}
      </ul>
    );
  }
}
