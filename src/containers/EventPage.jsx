import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { classes, ClassNamesPropType } from 'aesthetic';
import { isEmpty } from 'lodash';
import TimelineEventPage from '../components/views/TimelineEventPage';
import {
  SourceEventDataActionCreators,
  SourceEventDataActionCreatorPropTypes,
  SourceEventDataStateInitializer,
} from '../state/sourceEventData';
import {
  historyPropTypes,
  nullable,
  routeMatchPropTypes,
  tlEventPropTypes,
} from '../util/TypeChecking';

@connect(
  ({ seedDataAggregator }) => ({ seedData: seedDataAggregator }),
  (dispatch) => ({
    eventActions: bindActionCreators(SourceEventDataActionCreators, dispatch),
  }),
)
export default class EventPage extends Component {
  static displayName = 'TimelineEventPageContainer';

  static propTypes = {
    // classNames: ClassNamesPropType.isRequired,
    eventActions: SourceEventDataActionCreatorPropTypes,
    history: historyPropTypes.isRequired,
    match: routeMatchPropTypes.isRequired,
    seedData: tlEventPropTypes,
    staticContext: nullable(PropTypes.any),
  };

  static defaultProps = {
    eventActions: SourceEventDataActionCreators,
    seedData: SourceEventDataStateInitializer,
    staticContext: null,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    const {
      eventActions: { fetchSingleEvent },
      match: { params: { uuid } },
    } = this.props;

    return fetchSingleEvent(uuid);
  }

  render() {
    console.log('THIS.PROPS:', this.props);
    const {
      match: { params: { uuid } },
      seedData,
    } = this.props;
    const tlEvent = seedData[uuid];
    console.log('EVENT DATA:', tlEvent);

    return !isEmpty(tlEvent) && (
      <main>
        <TimelineEventPage
          event={tlEvent}
        />
      </main>
    );
  }
}
