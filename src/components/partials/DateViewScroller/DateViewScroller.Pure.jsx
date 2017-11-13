// @flow
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';

type Props = {
  withHorizontalLayout?: boolean,
  withRightAlignment?: boolean,
  withTopAlignment?: boolean,
};

export default class DateViewScrollerPure extends Component<Props> {
  static displayName = 'DateViewScroller';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    selectedDates: PropTypes.arrayOf(PropTypes.string).isRequired,
    withHorizontalLayout: PropTypes.bool,
    withRightAlignment: PropTypes.bool,
    withTopAlignment: PropTypes.bool,
  };

  static defaultProps = {
    withHorizontalLayout: false,
    withRightAlignment: false,
    withTopAlignment: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      currentDate: null,
    };
  }

  sortAndDistributeDates(currentDate) {
    const { selectedDates } = this.props;

    return selectedDates
      .sort()
      .map((date) => (this.renderYearMarker(date)));
  }

  renderYearMarker(year = new Date().getUTCFullYear()) {
    const { classNames } = this.props;

    return (
      <span className={classNames.yearMarker}>{year}</span>
    );
  }

  render() {
    const {
      classNames,
      withHorizontalLayout,
      withRightAlignment,
      withTopAlignment,
    } = this.props;
    const { currentDate } = this.state;

    return (
      <nav
        className={classes(
          classNames.dateViewScrollerContainer,
          !!withHorizontalLayout && classNames.dateViewScrollerHorizontal,
          !!withHorizontalLayout && !!withTopAlignment && classNames.dateViewScrollerAlignTop,
          !withHorizontalLayout && !!withRightAlignment && classNames.dateViewScrollerAlignRight,
        )}
      >
        {this.sortAndDistributeDates(currentDate)}
      </nav>
    );
  }
}
