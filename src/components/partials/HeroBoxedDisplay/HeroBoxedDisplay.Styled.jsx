import { default as HeroBoxedDisplayPure } from './HeroBoxedDisplay.Pure';
import styler from '../../../style/styler';

export default styler(({ colors, fonts, helpers, keywords }) => ({
  // Static declarations necessary for subsequent reference(s):

  boxedDisplayContainer: {
    position: 'relative',
  },
  boxedDisplayHeader: {
    margin: [0, keywords.auto],
    maxWidth: 800,
    position: 'relative',
    textAlign: 'center',
    top: '100%',
    transform: 'translateY(-55%)',
    zIndex: 1,
  },
  boxedDisplayHeroContainer: {
    ...helpers.flexify('column', 'center', ['center', 'center']),
    background: {
      attachment: null,
      color: colors.grey.line,
      repeat: 'no-repeat',
      position: ['center', 'center'],
      size: [keywords.auto, '60%'],
    },
    height: 400,
  },
  eventTitle: {
    background: {
      color: colors.red.primary,
      image: `linear-gradient(0deg, ${keywords.transparent} 0, ${colors.red.primary} 0)`,
      position: 0,
      size: '1rem',
      repeat: 'no-repeat',
    },
    boxDecorationBreak: 'clone',
    color: colors.grey.armadillo,
    display: 'inline',
    font: {
      lineHeight: 1.4,
      size: '4rem',
    },
    padding: [0, '1.285714rem'], // => `18px`
    WebkitBoxDecorationBreak: 'clone',
  },
}), {
  styleName: 'HeroBoxedDisplayStyles',
})(HeroBoxedDisplayPure);
