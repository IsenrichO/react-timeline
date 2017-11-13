import FormButtonPure from './FormButton.Pure';
import styler from '../../../style/styler';

const getButtonPseudoState = (pixelOffset = 1) => ({
  borderBottomWidth: 4 - +pixelOffset,
  lineHeight: `calc(1.4rem + ${+pixelOffset}px)`,
  transform: `translateY(${+pixelOffset}px)`,
});

export default styler(({ colors, fonts, helpers, keywords, transitions }) => ({
  formButton: {
    backgroundColor: colors.grey.loblolly,
    borderStyle: keywords.none,
    borderBottom: {
      color: colors.grey.buttonFace,
      radius: '8px',
      style: 'solid',
      width: 4,
    },
    color: colors.white.primary,
    float: 'right',
    font: {
      face: fonts.face.neue,
      lineHeight: '1.4rem',
      size: '1.4rem',
      style: keywords.normal,
      weight: 'bolder',
    },
    marginLeft: '1rem',
    minWidth: '20%',
    padding: ['0.75rem', '1.75rem'],
    transition: transitions.transitionAll({
      duration: 50,
      timingFunction: 'linear',
    }),

    '&:active': getButtonPseudoState(2),

    '&:hover': getButtonPseudoState(1),

    '&[disabled]': {
      ...getButtonPseudoState(2),
      color: 'rgba(255, 255, 255, 0.65)',
      cursor: 'not-allowed',
    },
  },
}), {
  styleName: 'FormButtonStyles',
})(FormButtonPure);
