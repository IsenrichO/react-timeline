import TextBasedInputPure from './TextBasedInput.Pure';
import styler from '../../../style/styler';

export default styler(({ colors, fonts, helpers, keywords, shared, transitions }) => ({
  // Static declarations necessary for subsequent reference(s):
  formContainer: {},
  requiredField: {},
  titleBlockInputIcon: {},
  validationMessage: {},

  formInput: {
    ...shared.inputGroup,
  },
  inputGroup: {
    borderCollapse: 'separate',
    borderRadius: '0.25rem',
    display: 'table',
    marginBottom: '1rem',
    position: 'relative',
    width: '100%',

    '&$requiredField': {
      '&:after': {
        backgroundColor: colors.status.danger,
        borderRadius: '50%',
        content: '""',
        height: '0.5rem',
        left: 'calc(100% + 0.5rem)',
        marginTop: '-0.125rem',
        position: 'absolute',
        top: '50%',
        width: '0.5rem',
      },
    },

    '& $validationMessage': {
      bottom: 'calc(100% + 0.375rem)',
      color: colors.status.danger,
      font: {
        family: fonts.face.neue,
        lineHeight: 1,
        size: '0.75rem',
        style: keywords.normal,
        weight: 600,
      },
      position: 'absolute',
      right: '15%',
    },

    '& textarea': {
      maxHeight: 300,
      minHeight: 110,
    },
  },
  inputGroupAddon: {
    backgroundColor: colors.red.semiTransparent,
    border: {
      color: colors.red.primary,
      style: 'solid',
      width: 1,
    },
    borderBottomLeftRadius: 'inherit',
    borderTopLeftRadius: 'inherit',
    color: colors.red.primary,
    display: 'table-cell',
    font: {
      family: fonts.face.raleway,
      lineHeight: 1,
      size: '1rem',
      style: 'normal',
      variant: 'normal',
      weight: 'bold',
    },
    padding: [6, 12],
    textAlign: 'center',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    width: '3rem',

    '& ~ $formContainer': {
      display: 'table-cell',
    },
  },
  inputGroupLabel: {
    display: keywords.none,
  },
}), {
  styleName: 'TextBasedInputStyles',
})(TextBasedInputPure);
