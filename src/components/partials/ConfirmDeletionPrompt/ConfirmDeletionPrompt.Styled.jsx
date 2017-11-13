import ConfirmDeletionPromptPure from './ConfirmDeletionPrompt.Pure';
import styler from '../../../style/styler';

export default styler(({ colors, fonts, helpers, keywords }) => ({
  // Static declarations necessary for subsequent reference(s):
  modalPortalContainer: {},

  confirmationPromptButtonsWrapper: {
    bottom: 0,
    height: 'calc(2.9rem + 4px)',
    marginTop: '3rem',
    position: 'relative',
    right: 0,
  },
  confirmationPromptForm: {
    height: '100%',
    position: 'relative',
  },
  confirmationPromptGlyphWrapper: {
    height: '6rem',
    width: '6rem',
  },
  confirmationPromptHeader: {
    font: {
      size: '3.5rem',
      weight: 200,
    },
    marginLeft: '2rem',
  },
  confirmationPromptHeaderWrapper: {
    ...helpers.flexify('row', 'flex-start', ['center', 'center']),
  },
  confirmationPromptLineDivider: {
    backgroundColor: colors.grey.line,
    height: 1,
  },
  confirmationPromptMessage: {
    fontSize: '1.3rem',
  },
  confirmationPromptWarningIcon: {
    color: `${colors.red.primary} ${keywords.important}`,
    fontFamily: fonts.face.material,
    height: `2rem ${keywords.important}`,
    width: `2rem ${keywords.important}`,
  },
  confirmationPromptWarningNote: {
    fontSize: '1.3rem',
    margin: [0, 0, 0, '1rem'],
  },
  confirmationPromptWarningNoteWrapper: {
    ...helpers.flexify('row', 'flex-start', ['center', 'center']),
    backgroundColor: colors.yellow.warn,
    borderRadius: '4px',
    marginTop: '1rem',
    padding: '1rem',
  },
}), {
  styleName: 'ConfirmDeletionPromptStyles',
})(ConfirmDeletionPromptPure);
