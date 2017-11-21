import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ClassNamesPropType } from 'aesthetic';
import { isEmpty } from 'lodash';
import TimelineEventPage from '../components/views/TimelineEventPage';
import {
  EventEditorActionCreators,
  EventEditorActionCreatorPropTypes,
  EventEditorStatePropTypes,
  EventEditorStateInitializer,
} from '../state/eventEditor';
import {
  SourceEventDataActionCreators,
  SourceEventDataActionCreatorPropTypes,
  SourceEventDataStateInitializer,
} from '../state/sourceEventData';
import {
  constructRoutePropTypesWithParams,
  historyPropTypes,
  nullable,
  tlEventPropTypes,
} from '../util/TypeChecking';

@connect(
  ({ eventEditorState, seedDataAggregator }) => ({ eventEditorState, seedData: seedDataAggregator }),
  (dispatch) => ({
    editorActions: bindActionCreators(EventEditorActionCreators, dispatch),
    eventActions: bindActionCreators(SourceEventDataActionCreators, dispatch),
  }),
)
export default class EventPage extends Component {
  static displayName = 'TimelineEventPageContainer';

  static propTypes = {
    classNames: ClassNamesPropType,
    editorActions: EventEditorActionCreatorPropTypes,
    eventActions: SourceEventDataActionCreatorPropTypes,
    eventEditorState: EventEditorStatePropTypes,
    history: historyPropTypes.isRequired,
    match: constructRoutePropTypesWithParams('uuid').isRequired,
    seedData: PropTypes.objectOf(tlEventPropTypes),
    staticContext: nullable(PropTypes.any),
  };

  static defaultProps = {
    classNames: {},
    editorActions: EventEditorActionCreators,
    eventActions: SourceEventDataActionCreators,
    eventEditorState: EventEditorStateInitializer,
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
    const {
      editorActions: { updateRichText },
      eventEditorState: { textBody },
      match: { params: { uuid } },
      seedData,
    } = this.props;
    const tlEvent = seedData[uuid];

    return !isEmpty(tlEvent) && (
      <main>
        <TimelineEventPage
          event={tlEvent}
          eventData={seedData}
          richText={textBody}
          updateRichText={updateRichText}
        />
      </main>
    );
  }
}
