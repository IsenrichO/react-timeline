import TlEventItemActionControlPure from './TlEventItemActionControl.Pure';
import styler from '../../../style/styler';

export default styler(({ colors }) => ({
  // Static declaration necessary for nested reference(s):
  invertedActionControl: {},

  collapseUp: {
    alignSelf: 'baseline',
    color: colors.white.primary,
    cursor: 'pointer',
    font: {
      size: '1.5rem',
      variant: 'small-caps',
    },
    left: '-0.5rem',
    opacity: 0,
    position: 'relative',
    textShadow: {
      blur: 5,
      color: colors.grey.dim,
      x: -2,
      y: -1,
    },
    top: '-0.5rem',
    transition: {
      delay: 250,
      duration: 250,
      property: 'all',
      timingFunction: 'cubic-bezier(0, 0.25, 0.7, 0.4)',
    },
    visibility: 'hidden',
    zIndex: 1,

    '&$invertedActionControl': {
      left: 'auto',
      order: 1,
      right: '-0.5rem',
    },
  },
}), {
  styleName: 'TimelineEventItemActionControlStyles',
})(TlEventItemActionControlPure);
