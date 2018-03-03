import TlEventItemActionControlPure from './TlEventItemActionControl.Pure';
import styler from '~/style/styler';

const rightAlignedActionControlStyles = (keywords) => ({
  left: keywords.auto,
  order: 1,
  right: '-0.5rem',
});

export default styler(({ colors, helpers, keywords, transitions }) => ({
  // Static declaration necessary for nested reference(s):
  actionControlForceAlignRight: {},
  eventHoverState: {},
  invertedActionControl: {},

  collapseUp: {
    ...helpers.setElementVisibility(),
    alignSelf: 'baseline',
    color: `${colors.white.primary} ${keywords.important}`,
    cursor: 'pointer',
    font: {
      size: `2.5rem ${keywords.important}`,
      variant: 'common-ligatures',
      weight: 'bolder',
    },
    left: '-0.8rem',
    textShadow: {
      blur: 5,
      color: colors.grey.dim,
      x: -2,
      y: -1,
    },
    top: '-1rem',
    transition: helpers.condenseStyles(transitions.hoverTransition(), true),
    zIndex: 1,

    '&$eventHoverState': {},

    '&$invertedActionControl': rightAlignedActionControlStyles(keywords),
    '&$actionControlForceAlignRight': rightAlignedActionControlStyles(keywords),
  },
}), {
  styleName: 'TimelineEventItemActionControlStyles',
})(TlEventItemActionControlPure);
