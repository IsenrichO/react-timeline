// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';
import HeroBoxedDisplay from '../partials/HeroBoxedDisplay';
import {
  browserLocationPropTypes,
  constructRoutePropTypesWithParams,
  historyPropTypes,
  tlEventPropTypes,
} from '../../util/TypeChecking';

type Props = {};

export default class TimelineEventPagePure extends Component<Props> {
  static displayName = 'TimelineEventPage';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    event: tlEventPropTypes.isRequired,
    history: historyPropTypes.isRequired,
    location: browserLocationPropTypes.isRequired,
    match: constructRoutePropTypesWithParams('uuid').isRequired,
  };

  static defaultProps = {};

  render() {
    const {
      event,
      event: { name = '' },
    } = this.props;

    return (
      <div>
        <HeroBoxedDisplay
          eventName={name}
        />
      </div>
    );
  }
}
