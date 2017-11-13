import NumericSignifierPure from './NumericSignifier.Pure';
import styler from '../../../style/styler';

export default styler(({ colors, fonts, helpers }) => ({
  numericSignifierContainer: {
    ...helpers.flexify('column', 'center', ['center', 'center']),
    backgroundColor: colors.black.primary,
    borderRadius: 50,
    color: colors.white.primary,
    font: {
      family: fonts.face.neue,
      size: '1.5rem',
      style: 'italic',
      weight: 300,
    },
    height: 40,
    left: '-1rem',
    position: 'absolute',
    top: '-1rem',
    width: 40,
    zIndex: 10,
  },
}), {
  styleName: 'NumericSignifierStyles',
})(NumericSignifierPure);
