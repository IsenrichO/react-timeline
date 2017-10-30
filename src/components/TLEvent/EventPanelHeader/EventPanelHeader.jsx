import EventPanelHeaderPure from './EventPanelHeader.Pure';
import styler from '../../../style/styler';

const headerTailLeft = 'polygon(0 0, 100% 0, 100% 100%, 1.5rem 100%, 1.5rem 1.5rem)';
const headerTailRight = 'polygon(0 0, 100% 0, calc(100% - 1.5rem) 1.5rem, calc(100% - 1.5rem) 100%, 0 100%)';

export default styler(({ colors, helpers, transitions }) => ({
  // Static declarations necessary for nested reference(s):
  invertedPanel: {},
  panelHeaderShapeWithPointer: {},

  panelHeaderContainer: {
    position: 'relative',
  },
  panelHeaderShape: {
    ...helpers.flexify(),
    ...helpers.hideOverflow,
    background: {
      attachment: null,
      color: colors.white.hue,
      position: ['center', '30%'],
      repeat: 'no-repeat',
      size: 100,
    },
    backgroundBlendMode: 'multiply',
    border: 'none',
    maxHeight: 150,
    minHeight: '7.142857142857143rem',  // => (100 / 14)px
    padding: '1.25rem',
    position: 'relative',
    textAlign: 'end',
    transition: transitions.customTimingFunction({
      duration: 250,
      property: 'background-size',
    }),
    width: '100%',

    '&$invertedPanel': {
      '& $panelHeaderTitle': {
        margin: [0, 0, 0, '1.5rem'],  // Four-value syntax necessary to override `margin-right` value
        textAlign: 'start',
      },
    },

    '&$panelHeaderShapeWithPointer': {
      WebkitClipPath: headerTailRight, // eslint-disable-line sort-keys
      clipPath: headerTailRight,
      WebkitShapeOutside: headerTailRight, // eslint-disable-line sort-keys
      shapeOutside: headerTailRight,
      width: 'calc(100% + 1.5rem)',

      '&$invertedPanel': {
        WebkitClipPath: headerTailLeft,
        clipPath: headerTailLeft,
        left: '-1.5rem',
        WebkitShapeOutside: headerTailLeft, // eslint-disable-line sort-keys
        shapeOutside: headerTailLeft,
      },
    },

    '&:hover': {
      backgroundSize: 145,
      transition: {
        delay: 350,
        duration: 750,
        property: 'background-size',
        timingFunction: 'ease-in-out',
      },
    },
  },
  panelHeaderTitle: {
    ...helpers.flexify('column', 'center'),
    ...helpers.hideOverflow,
    color: colors.white.primary,
    fontVariant: 'small-caps',
    marginRight: '1.5rem',
    position: 'relative',
    textAlign: '-webkit-auto', // Fallback used when inline value is `null`
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
  styleName: 'EventPanelHeaderStyles',
})(EventPanelHeaderPure);
