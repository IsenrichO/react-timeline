import EditEventModalPure from './EditEventModal.Pure';
import styler from '../../style/styler';

const pseudoClassStyles = {
  borderRadius: '14px',
  content: '""',
  height: '5vh',
  left: '0',
  position: 'absolute',
  width: '100%',
  zIndex: 10,
};

export default styler(({ colors, fonts, keywords, helpers, imageAssetUrls }) => ({
  // Static declarations necessary for subsequent reference(s):
  dropzone: {},
  dropzoneBox: {},
  formFieldset: {},

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
    position: 'absolute',
    right: '-2rem',
    textAlign: 'center',
    top: '-2rem',
    width: '4rem',
    zIndex: 11,

    '&:hover': {
      backgroundColor: colors.red.focus,
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
    height: '100%',
    margin: ['5%', 0],
    maxHeight: '75vh',
    overflowY: 'scroll',
    padding: [0, '5%'],

    '&:before': {
      ...pseudoClassStyles,
      backgroundImage: imageAssetUrls.modalGradient('bottom'),
      top: 0,
    },

    '&:after': {
      ...pseudoClassStyles,
      backgroundImage: imageAssetUrls.modalGradient('top'),
      bottom: 0,
    },
  },
}), {
  styleName: 'EditEventModalStyles',
})(EditEventModalPure);
