import FileUploadApiPure from './FileUploadApi.Pure';
import styler from '../../../style/styler';

export default styler(({ colors, fonts, helpers, keywords }) => ({
  // Static declarations necessary for subsequent reference(s):
  directiveText: {},
  dropzoneBox: {},
  fileUploadButton: {},

  dropzone: {
    border: {
      color: colors.red.primary,
      radius: '8px',
      style: 'dashed',
      width: '0.357143rem',
    },
    color: colors.grey.lite,
    font: {
      family: fonts.face.vollkorn,
      size: '20pt',
    },
    textAlign: 'center',

    '& $dropzoneBox': {
      backgroundColor: colors.red.semiTransparent,
      borderRadius: '8px',
      margin: '0.65rem',
      padding: ['2.5rem', '1.785714rem', '1.785714rem'],

      '& > $directiveText': {
        marginTop: '1.5rem',
      },

      '& $fileUploadButton': {
        display: keywords.none,
      },

      '& label': {
        cursor: 'pointer',
      },
    },
  },
  formFieldset: {
    margin: ['2rem', keywords.auto],
    maxWidth: 665,
    width: '95%',
  },
}), {
  styleName: 'FileUploaderStyles',
})(FileUploadApiPure);
