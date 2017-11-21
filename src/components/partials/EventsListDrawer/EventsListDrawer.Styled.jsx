import EventsListDrawerPure from './EventsListDrawer.Pure';
import styler from '../../../style/styler';

export default styler(({ colors, fonts, helpers, keywords }) => ({
  // Static `className` declarations necessary for nested references:
  eventsListDrawerCloseButton: {},
  eventsListDrawerOverlay: {},
  eventsListDrawerRootContainer: {},

  eventsListDrawerContainer: {
    maxWidth: 450,
    overflowX: `hidden ${keywords.important}`,
  },
  eventsListDrawerHeaderBar: {
    backgroundColor: `${colors.blue.fountain} ${keywords.important}`,
  },
  eventsDrawerMenuItem: {
    ...helpers.hideOverflow,
  },
}), {
  styleName: 'EventsListDrawerStyles',
})(EventsListDrawerPure);
