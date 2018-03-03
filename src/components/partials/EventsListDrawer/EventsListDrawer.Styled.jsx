import EventsListDrawerPure from './EventsListDrawer.Pure';
import styler               from '~/style/styler';

export default styler(({ colors, fonts, helpers, keywords }) => ({
  // Static `className` declarations necessary for nested references:
  eventsListDrawerCloseButton: {},
  eventsListDrawerOverlay: {},
  eventsListDrawerRootContainer: {},
  eventsListDrawerTooltip: {},

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
  eventsListDrawerTypography: {
    flex: 1,
  },
}), {
  styleName: 'EventsListDrawerStyles',
})(EventsListDrawerPure);
