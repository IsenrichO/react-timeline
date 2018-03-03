// @flow
import React, { Component }   from 'react';
import PropTypes              from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';
import update                 from 'immutability-helper';
import InfiniteCalendar       from 'react-infinite-calendar';
import { aesthetic }          from '~/style/styler';
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

  static displayOpts = {
    hideYearsOnSelect: true,
    layout: 'landscape',
    overscanMonthCount: 4,
    shouldHeaderAnimate: true,
    showHeader: true,
    showOverlay: true,
    showTodayHelper: true,
    showWeekdays: true,
    todayHelperRowOffset: 6,
  };

  static getCalendarTheme = (themeColors) => ({
    floatingNav: {
      background: themeColors.red.dark,
      chevron: themeColors.green.oxidized,
      color: themeColors.white.primary,
    },
    headerColor: themeColors.red.secondary,
    selectionColor: themeColors.red.primary,
    textColor: {
      active: themeColors.white.primary,
      default: themeColors.grey.primary,
    },
    weekdayColor: themeColors.red.primary,
  });

  static localeOpts = {
    blank: 'Select a date for this event',
    headerFormat: 'dddd, MMMM Do',
    locale: require('date-fns/locale/en'),
    todayLabel: {
      long: 'Today',
      short: 'Today',
    },
    weekStartsOn: 0,
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  };

  constructor(props) {
    super(props);
    const { theme, input: { value: initialDate } } = props;

    this.state = {
      selectedDate: initialDate,
    };

    this.dateClickHandler = ::this.dateClickHandler;
    this.handleDateSelection = ::this.handleDateSelection;
    this.theme = aesthetic.themes[theme];
  }

  dateClickHandler(selectedDate) {
    return this.setState(update(this.state, {
      selectedDate: { $set: selectedDate },
    }));
  }

  handleDateSelection(evt) {
    const { changeHandler } = this.props;
    const { selectedDate } = this.state;

    return changeHandler('date', selectedDate);
  }

  render() {
    const { classNames, input } = this.props;
    const { colors: themeColors } = this.theme;

    return (
      <InfiniteCalendar
        {...input}
        autoFocus
        className={classNames.infiniteCalendarRootContainer}
        display="days"
        displayOptions={CalendarDateInputPure.displayOpts}
        locale={CalendarDateInputPure.localeOpts}
        onSelect={this.handleDateSelection}
        rowHeight={50}
        selected={input.value}
        tabIndex={0}
        theme={CalendarDateInputPure.getCalendarTheme(themeColors)}
      />
    );
  }
}
