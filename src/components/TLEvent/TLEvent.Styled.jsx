import TLEventPure from './TLEvent.Pure';
import styler from '~/style/styler';

export default styler(({ colors, fonts, helpers, keywords, transitions }) => ({
  // Static declarations necessary for subsequent reference(s):
  batchSelectActive: {},
  invertedMarker: {},
  invertedPanel: {},
  tlEventPanelFullWidth: {},

  tlEvent: {
    clear: 'both',
    display: 'table-cell',
    float: 'left',
    marginBottom: '10vh',
    maxHeight: 1000,
    position: 'relative',
    transition: {
      delay: null,
      duration: 1000,
      property: 'all',
      timingFunction: 'ease-in',
    },
    width: '50%',
  },
  inverted: {
    float: 'right',
  },
  tlEventPanel: {
    backgroundColor: colors.white.primary,
    boxShadow: {
      blur: 15,
      color: 'rgba(0, 0, 0, 0.35)',
      inset: null,
      spread: 2,
      x: 1,
      y: 2,
    },
    opacity: 0,
    outline: {
      color: keywords.transparent,
      style: 'solid',
      width: 0,
    },
    position: 'relative',
    right: 'calc(-15% + 5rem)',
    transform: 'translateX(-100px)',
    transition: [{
      delay: null,
      duration: 500,
      property: 'outline',
      timingFunction: 'ease-in-out',
    }, {
      delay: null,
      duration: 750,
      property: 'transform',
      timingFunction: 'linear',
    }],
    visibility: 'hidden',
    width: '85%',

    '&$batchSelectActive': {
      outline: {
        color: 'rgba(177, 91, 91, 0.23)',
        style: 'solid',
        width: 21,
      },
      transition: transitions.customTimingFunction(),
      transitionProperty: 'outline',
    },

    '&$tlEventPanelFullWidth': {
      right: keywords.auto,
      width: keywords.auto,
    },

    '&:hover': {
      '& .tlToolbar': {
        ...helpers.markObjectValuesImportant(helpers.setElementVisibility(false)),
      },

      '& [class^="eventHoverState"]': {
        ...helpers.markObjectValuesImportant(helpers.setElementVisibility(false)),
      },
    },

    '&$invertedPanel': {
      left: '5rem',

      '&:before': {
        borderBottom: {
          color: keywords.transparent,
          style: 'solid',
          width: 'calc(1.5rem + 2px)',
        },
        borderLeft: {
          color: colors.grey.border,
          style: 'solid',
          width: 0,
        },
        borderRight: {
          color: colors.grey.border,
          style: 'solid',
          width: 'calc(1.5rem + 2px)',
        },
        left: keywords.auto,
        right: '100%',
      },

      '&:after': {
        borderBottom: {
          color: keywords.transparent,
          style: 'solid',
          width: '1.5rem',
        },
        borderLeft: {
          color: colors.white.primary,
          style: 'solid',
          width: 0,
        },
        borderRight: {
          color: colors.white.primary,
          style: 'solid',
          width: '1.5rem',
        },
        left: keywords.auto,
        right: '100%',
      },
    },
  },
  inView: {
    opacity: 1,
    transform: `translateX(0) ${keywords.important}`,
    visibility: 'visible',
  },
  tlMarker: {
    height: 32,
    position: 'absolute',
    right: -16,
    textAlign: 'center',
    top: -16,
    width: 32,

    '&$invertedMarker': {
      left: -16,
    },
  },
  tlMarkerIcon: {
    backgroundColor: colors.white.background,
    border: {
      color: colors.white.background,
      radius: 50,
      style: 'solid',
      width: 2,
    },
    boxShadow: {
      blur: 8,
      color: colors.black.backgroundSemiOp,
      inset: null,
      spread: null,
      x: 0,
      y: 0,
    },
    font: {
      family: fonts.face.material,
      lineHeight: 1,
      size: '2rem',
      stretch: keywords.normal,
      style: keywords.normal,
      variant: keywords.normal,
      weight: 'bold',
    },

    '&:before, &:after': {
      backgroundColor: colors.white.primary,
      bottom: 'calc(100% - 1px)',
      content: '""',
      height: 8,
      left: '50%',
      position: 'absolute',
      transform: 'translateX(-50%)',
      width: 4.5,
    },

    '&:after': {
      top: 'calc(100% - 1px)',
    },
  },
}), {
  styleName: 'TimelineEventStyles',
})(TLEventPure);
