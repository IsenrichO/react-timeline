import DateInputPure from './DateInput.Pure';
import styler from '~/style/styler';

export default styler(({ colors, fonts, helpers, keywords }) => ({
  // Static `className` declarations necessary for nested references:
  dateInputModalContentContainer: {},
  dateInputModalOverlayContainer: {},

  dateInputModalActionsContainer: {
    ...helpers.flexify('row', 'flex-end', ['center']),
    paddingRight: `0 ${keywords.important}`,

    '& > div': {
      marginLeft: 16,
    },
  },
  dateInputModalBodyContainer: {
    padding: `0 ${keywords.important}`,
  },
  dateInputModalPaperContainer: {
    backgroundColor: `${keywords.transparent} ${keywords.important}`,
    boxShadow: `${keywords.none} ${keywords.important}`,
  },
  dateInputModalTitle: {
    color: `${colors.red.primary} ${keywords.important}`,
    fontSize: `${fonts.size.modal}px ${keywords.important}`,
    padding: helpers.condenseStyles([24, 24, 20, 0], true),
    textShadow: {
      blur: 10,
      color: colors.black.navReelBackground,
      x: 0,
      y: 0,
    },
  },
}), {
  styleName: 'DateInputFieldStyles',
})(DateInputPure);
