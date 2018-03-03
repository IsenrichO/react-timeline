import SocialPickerPure from './SocialPicker.Pure';
import styler           from '~/style/styler';

export default styler(({ colors, fonts, helpers, keywords }) => ({
  // Static `className` declarations necessary for nested references:
  socialShareDialogTitle: {},

  showMoreToggleDot: {
    font: {
      size: fonts.size.modal,
      weight: 'bold',
    },
  },
  showMoreToggle: {
    cursor: 'pointer',

    '&:focus': {
      // Remove the browser-implemented focus ring eyesore:
      outline: keywords.none,

      // Maintain accessibility by instead accenting the horizontal ellipsis with coloration:
      '& > $showMoreToggleDot': {
        color: colors.blue.accent,
      },
    },
  },
  socialShareDialogBody: {
    ...helpers.flexify('column', 'space-around', ['center', 'center']),
  },
  socialShareDialogContainer: {
    minWidth: '50vw',
  },
  socialShareRow: {
    ...helpers.flexify('row', 'flex-start', ['center', 'center'], [], 'wrap'),
    margin: [12, keywords.auto],
    width: '100%',
  },
}), {
  styleName: 'SocialPickerStyles',
})(SocialPickerPure);
