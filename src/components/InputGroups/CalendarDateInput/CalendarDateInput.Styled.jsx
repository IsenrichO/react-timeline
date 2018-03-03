import CalendarDateInputPure from './CalendarDateInput.Pure';
import styler from '~/style/styler';

export default styler(({ colors, fonts, helpers, keywords }) => ({
  // Static declarations necessary for subsequent reference(s):

  infiniteCalendarRootContainer: {
    height: 438,
    marginBottom: '2rem',
    width: `100% ${keywords.important}`,
  },
}), {
  styleName: 'CalendarDateInputStyles',
})(CalendarDateInputPure);
