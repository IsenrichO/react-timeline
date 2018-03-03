// @flow
import React, { Component }                      from 'react';
import PropTypes                                 from 'prop-types';
import { connect }                               from 'react-redux';
import { bindActionCreators }                    from 'redux';
import { ClassNamesPropType }                    from 'aesthetic';
import update                                    from 'immutability-helper';
import { get, isEmpty }                          from 'lodash';
import withScrolling, { createVerticalStrength } from 'react-dnd-scrollzone';
import BodyContent                               from './BodyContent';
import EventsListDrawer                          from '~/components/partials/EventsListDrawer';
import HeroBoxedDisplay                          from '~/components/partials/HeroBoxedDisplay';
import RichTextEditor                            from '~/components/partials/RichTextEditor';
import { updateSingleEvent }                     from '~/state/sourceEventData';
import { cloudinaryPropTypes, tlEventPropTypes } from '~/util/TypeChecking';

/* FLOW TYPES */
type Props = {
  richText?: string,
  theme?: string,
};

type State = {
  isDrawerOpen: boolean,
};

@connect(
  ({ cloudinaryState }) => ({ cloudinaryState }),
  (dispatch) => bindActionCreators({
    updateEvent: updateSingleEvent,
  }, dispatch),
)
export default class EventDetailPagePure extends Component<Props, State> {
  static displayName = 'EventDetailPagePure';

  static propTypes = {
    classNames: ClassNamesPropType,
    cloudinaryState: cloudinaryPropTypes.isRequired,
    event: tlEventPropTypes.isRequired,
    eventData: PropTypes.objectOf(tlEventPropTypes).isRequired,
    richText: PropTypes.string,
    theme: PropTypes.string,
    updateEvent: PropTypes.func.isRequired,
    updateRichText: PropTypes.func.isRequired,
  };

  static defaultProps = {
    classNames: {},
    richText: '',
    theme: 'base',
    updateEvent: updateSingleEvent,
  };

  constructor(props) {
    super(props);

    this.state = {
      isDrawerOpen: false,
    };

    this.handleDrawerToggle = ::this.handleDrawerToggle;
    this.handleDrawerOpen = (...args) => this.handleDrawerToggle(true, ...args);
    this.handleDrawerClose = (...args) => this.handleDrawerToggle(false, ...args);
  }

  handleDrawerToggle(open, reason = null) {
    // Throw warning to log when an unrecognized `reason` is provided:
    if (!['clickaway', 'escape', 'swipe', null].includes(reason)) {
      console.warn(`Invalid reason:\t`, reason);
    }

    return this.setState(update(this.state, {
      $toggle: ['isDrawerOpen'],
    }));
  }

  render() {
    const {
      classNames,
      cloudinaryState,
      event,
      event: {
        layout = null,
        name = '',
        uuid,
      },
      eventData,
      richText,
      updateEvent,
      updateRichText,
    } = this.props;
    const { isDrawerOpen } = this.state;

    const ScrollZone = withScrolling('div');

    return (
      <div>
        <EventsListDrawer
          eventData={eventData}
          eventId={uuid}
          handleDrawerClose={this.handleDrawerClose}
          handleDrawerToggle={this.handleDrawerToggle}
          isDrawerOpen={isDrawerOpen}
          selectedEventData={event}
        />
        <ScrollZone
          ref={viewHolderEl => { this.viewHolderEl = viewHolderEl; }}
          className={classNames.pageLayoutContainer}
          strengthMultiplier={35}
          verticalStrength={createVerticalStrength(245)}
        >
          <HeroBoxedDisplay
            event={event}
            eventName={name}
            handleDrawerOpen={this.handleDrawerOpen}
            imageData={get(cloudinaryState, uuid, null)}
          />
          <BodyContent
            event={event}
            layout={layout}
            updateEvent={updateEvent}
          />
        </ScrollZone>
        <RichTextEditor
          richText={event.description[0]}
          updateRichText={updateRichText}
        />
      </div>
    );
  }
}
