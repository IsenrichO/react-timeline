// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';
import update from 'immutability-helper';
import EventsListDrawer from '../partials/EventsListDrawer';
import HeroBoxedDisplay from '../partials/HeroBoxedDisplay';
import RichTextEditor from '../partials/RichTextEditor';
import { tlEventPropTypes } from '../../util/TypeChecking';

type Props = {
  richText?: string,
};

export default class TimelineEventPagePure extends Component<Props> {
  static displayName = 'TimelineEventPage';

  static propTypes = {
    classNames: ClassNamesPropType,
    event: tlEventPropTypes.isRequired,
    eventData: PropTypes.objectOf(tlEventPropTypes).isRequired,
    richText: PropTypes.string,
    updateRichText: PropTypes.func.isRequired,
  };

  static defaultProps = {
    classNames: {},
    richText: '',
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
    // Throw warning log if unrecognized `reason` is given:
    if (!['clickaway', 'escape', 'swipe', null].includes(reason)) console.warn(`Invalid reason:\t`, reason);

    return this.setState(update(this.state, {
      $toggle: ['isDrawerOpen'],
    }));
  }

  render() {
    const {
      event,
      event: { name = '', uuid },
      eventData,
      richText,
      updateRichText,
    } = this.props;
    const { isDrawerOpen } = this.state;

    return (
      <div>
        <EventsListDrawer
          eventData={eventData}
          eventId={uuid}
          isDrawerOpen={isDrawerOpen}
          handleDrawerClose={this.handleDrawerClose}
          handleDrawerToggle={this.handleDrawerToggle}
          selectedEventData={event}
        />
        <HeroBoxedDisplay
          eventName={name}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <RichTextEditor
          richText={event.description[0]} // {richText}
          updateRichText={updateRichText}
        />
      </div>
    );
  }
}
