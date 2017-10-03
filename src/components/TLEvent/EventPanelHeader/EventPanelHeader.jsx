import EventPanelHeaderPure from './EventPanelHeader.Pure';
import styler from '../../../style/styler';

const headerTailLeft = 'polygon(0 0, 100% 0, 100% 100%, 1.5rem 100%, 1.5rem 1.5rem)';
const headerTailRight = 'polygon(0 0, 100% 0, calc(100% - 1.5rem) 1.5rem, calc(100% - 1.5rem) 100%, 0 100%)';

export default styler(({ colors, helpers }) => ({
  // Static declarations necessary for nested reference(s):
  invertedPanel: {},

  panelHeader: {
    ...helpers.flexify(),
    ...helpers.hideOverflow,
    background: {
      color: colors.grey.lite,
      position: ['center', '30%'],
      repeat: 'no-repeat',
      size: '100%',
    },
    backgroundBlendMode: 'multiply',
    border: 'none',
    WebkitClipPath: headerTailRight, // eslint-disable-line sort-keys
    clipPath: headerTailRight,
    maxHeight: 150,
    minHeight: '7.142857142857143rem',  // => (100 / 14)px
    padding: '1.25rem',
    position: 'relative',
    WebkitShapeOutside: headerTailRight, // eslint-disable-line sort-keys
    shapeOutside: headerTailRight,
    textAlign: 'end',
    transition: {
      delay: 125,
      duration: 450,
      property: 'background-size',
      timingFunction: 'cubic-bezier(0, 0.25, 0.7, 0.4)', // $transitionTimingFunc
    },
    width: 'calc(100% + 1.5rem)',

    '&$invertedPanel': {
      WebkitClipPath: headerTailLeft,
      clipPath: headerTailLeft,
      left: '-1.5rem',
      WebkitShapeOutside: headerTailLeft, // eslint-disable-line sort-keys
      shapeOutside: headerTailLeft,

      '& $panelHeaderTitle': {
        margin: [0, 0, 0, '1.5rem'],  // Four-value syntax necessary to override `margin-right` value
        textAlign: 'start',
      },
    },

    '&:hover': {
      transition: {
        delay: null,
        duration: 450,
        property: 'background-size',
        timingFunction: 'ease-in-out',
      },
    },
  },
  panelHeaderTitle: {
    ...helpers.hideOverflow,
    color: colors.white.primary,
    display: '-webkit-box',
    fontVariant: 'small-caps',
    marginRight: '1.5rem',
    position: 'relative',
    textAlign: 'end',
    textShadow: {
      blur: 5,
      color: colors.grey.dim,
      x: -2,
      y: -1,
    },
    top: '-0.25rem',
    WebkitBoxOrient: 'vertical', // eslint-disable-line sort-keys
    WebkitLineClamp: 4,
    whiteSpace: 'pre-line',
    width: '95%',
    wordWrap: 'break-word',
    zIndex: 1,
  },
}), {
  styleNaME: 'EventPanelHeader',
})(EventPanelHeaderPure);
