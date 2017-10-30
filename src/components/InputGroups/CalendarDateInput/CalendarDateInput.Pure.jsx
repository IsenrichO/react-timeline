// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';
import InfiniteCalendar from 'react-infinite-calendar';
import { aesthetic } from '../../../style/styler';
import 'react-infinite-calendar/styles.css'; // Only needs to be imported once

type Props = {
  error?: boolean,
  id?: string,
  isRequired?: boolean,
  theme?: string,
  touch?: boolean,
};

export default class CalendarDateInputPure extends Component<Props> {
  static displayName = 'CalendarDateInput';

  static propTypes = {
    changeHandler: PropTypes.func.isRequired,
    classNames: ClassNamesPropType.isRequired,
    error: PropTypes.bool,
    id: PropTypes.string,
    input: PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string,
    }).isRequired,
    isRequired: PropTypes.bool,
    theme: PropTypes.string,
    touched: PropTypes.bool,
  };

  static defaultProps = {
    error: false,
    id: null,
    isRequired: false,
    theme: 'base',
    touched: false,
  };

  constructor(props) {
    super(props);
    const { theme = 'base' } = props;

    this.theme = aesthetic.themes[theme];
    const { colors: baseThemeColors } = this.theme;

    this.calendarTheme = {
      floatingNav: {
        background: baseThemeColors.red.dark,
        chevron: baseThemeColors.green.oxidized,
        color: baseThemeColors.white.primary,
      },
      headerColor: baseThemeColors.red.secondary,
      selectionColor: baseThemeColors.red.primary,
      textColor: {
        active: baseThemeColors.white.primary,
        default: baseThemeColors.grey.primary,
      },
      weekdayColor: baseThemeColors.red.primary,
    };

    this.handleDateSelection = ::this.handleDateSelection;
  }

  handleDateSelection(selectedDate) {
    const { changeHandler } = this.props;
    return changeHandler('date', selectedDate);
  }

  render() {
    const {
      classNames,
      input,
    } = this.props;

    return (
      <InfiniteCalendar
        {...input}
        autoFocus
        className={classNames.infiniteCalendarRootContainer}
        display="days"
        displayOptions={{
          layout: 'landscape',
        }}
        locale={{
          blank: 'Select a date for this event',
          headerFormat: 'ddd., Do of MMMM',
          // locale: require('date-fns/locale/fr'),
          todayLabel: {
            long: 'Today',
            short: 'Today',
          },
          weekStartsOn: 0,
          weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        }}
        onSelect={this.handleDateSelection}
        rowHeight={50}
        selected={input.value} // new Date()}
        tabIndex={1}
        theme={this.calendarTheme}
      />
    );
  }
}
