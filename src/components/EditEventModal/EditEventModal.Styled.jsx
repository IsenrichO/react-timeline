import EditEventModalPure from './EditEventModal.Pure';
import styler             from '~/style/styler';

const getDrawerAnimationStyle = (keywords, isClosing = false, isInverted = false) => ({
  delay: null,
  direction: keywords.normal,
  duration: 500,
  fillMode: 'forwards',
  iterationCount: 1,
  name: `slideEditDrawer${!!isClosing ? 'Out' : 'In'}From${!!isInverted ? 'Left' : 'Right'}`,
  timingFunction: 'linear',
});

const getDrawerPseudoClassStyles = (colors, keywords, isInverted = false) => ({
  [`border${!!isInverted ? 'Right' : 'Left'}`]: {
    color: keywords.transparent,
    style: 'solid',
    width: 120,
  },
  borderTop: {
    color: colors.white.pure,
    style: 'solid',
    width: 'calc(100vh - 64px)',
  },
  content: '""',
  filter: `drop-shadow(${!!isInverted ? '+' : '-'}16px 0 8px ${colors.black.backgroundSemiOp})`,
  [`${!!isInverted ? 'left' : 'right'}`]: '100%',
  position: 'absolute',
  top: 0,
  zIndex: 10,
});

const getModalWrapperPseudoClassStyles = {
  borderRadius: '14px',
  content: '""',
  height: '5vh',
  left: '0',
  position: 'absolute',
  width: '100%',
  zIndex: 10,
};

export default styler(({ colors, fonts, keywords, helpers, imageAssets, transitions }) => ({
  // Static declarations necessary for subsequent reference(s):
  closeButtonPanelLeft: {},
  closeButtonPanelRight: {},
  dropzone: {},
  dropzoneBox: {},
  editEventDrawerClose: {},
  editEventDrawerLeft: {},
  editEventDrawerRight: {},
  formFieldset: {},
  scrollbarAlignmentLeft: {},
  scrollbarAlignmentRight: {},

  closeButton: {
    ...helpers.disableSelection,
    backgroundColor: colors.red.primary,
    border: keywords.none,
    borderRadius: '50%',
    color: colors.white.primary,
    cursor: 'pointer',
    font: {
      family: fonts.face.arial,
      lineHeight: 1,
      size: '4rem',
      weight: 'bolder',
    },
    height: '4rem',
    position: `absolute ${keywords.important}`,
    textAlign: 'center',
    top: '1rem',
    width: '4rem',
    zIndex: 11,

    '&$closeButtonPanelLeft': {
      right: '-10.2rem',
    },

    '&$closeButtonPanelRight': {
      left: '-10.2rem',
    },

    '&:hover': {
      backgroundColor: colors.red.focus,
    },
  },
  editEventDrawer: {
    backgroundColor: colors.white.pure,
    height: 'calc(100vh - 64px)',
    position: 'fixed',
    top: 64,
    transition: transitions.transitionAll,
    width: '45vw',
    zIndex: 11,

    '&$editEventDrawerLeft': {
      animation: getDrawerAnimationStyle(keywords, false, true),
      left: 0,

      '&$editEventDrawerClose': {
        animation: getDrawerAnimationStyle(keywords, true, true),
        left: 0,
      },

      '&::after': getDrawerPseudoClassStyles(colors, keywords, true),
    },

    '&$editEventDrawerRight': {
      animation: getDrawerAnimationStyle(keywords, false, false),
      left: keywords.auto,
      right: 0,

      '&$editEventDrawerClose': {
        animation: getDrawerAnimationStyle(keywords, true, false),
        right: 0,
      },

      '&::after': getDrawerPseudoClassStyles(colors, keywords, false),
    },

  },
  editEventForm: {
    '& $formFieldset': {
      margin: ['2rem', keywords.auto],
      maxWidth: 665,
      width: '95%',
    },
  },
  modalWrapper: {
    direction: 'ltr',
    margin: ['5%', 0],
    padding: ['5%', '5%', '10%'],

    '&:before': {
      ...getModalWrapperPseudoClassStyles,
      backgroundImage: imageAssets.modalGradient('bottom'),
      top: 0,
    },

    '&:after': {
      ...getModalWrapperPseudoClassStyles,
      backgroundImage: imageAssets.modalGradient('top'),
      bottom: 0,
    },
  },
  scrollbarAlignment: {
    height: '100%',
    overflowY: 'scroll',

    '&$scrollbarAlignmentLeft': {
      direction: 'rtl',
    },

    '&$scrollbarAlignmentRight': {
      direction: 'ltr',
    },
  },
}), {
  styleName: 'EditEventModalStyles',
})(EditEventModalPure);
