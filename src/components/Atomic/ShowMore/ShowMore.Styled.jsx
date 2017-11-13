import dedent from 'dedent';
import ShowMorePure from './ShowMore.Pure';
import styler from '../../../style/styler';

export default styler(({ colors, helpers, keywords }) => ({
  // Static `className` declarations necessary for nested references:
  bgLine: {},
  contentExpansionLink: {},

  hidden: {
    display: `block ${keywords.important}`,
  },
  separatorFade: {
    borderWidth: 0,
    height: 16,
    margin: 0,
    position: 'relative',

    '&:before': {
      backgroundImage: dedent(`
        linear-gradient(
          to top,
          ${colors.white.primary} 40%,
          rgba(255, 255, 255, 0.75) 82%,
          rgba(255, 255, 255, 0.50) 90%,
          ${keywords.transparent}
        )
      `),
      bottom: 0,
      content: '""',
      height: 40,
      left: 0,
      position: 'absolute',
      transition: {
        delay: null,
        duration: '575ms',
        property: 'opacity',
        timingFunction: 'cubic-bezier(0, 0.25, 0.70, 0.40)',
      },
      width: '100%',
    },
  },
  showMore: {
    ...helpers.flexify(),
    left: '50%',
    overflow: 'hidden',
    padding: 'inherit',
    position: 'absolute',
    top: '1.25em',
    transform: 'translate(-50%, -50%)',
    width: 'inherit',

    '& $bgLine': {
      marginTop: '0.5rem',
      width: '45%',

      '&:before': {
        borderBottom: {
          color: colors.grey.backgroundLine,
          style: 'solid',
          width: 1,
        },
        content: '""',
        display: 'block',
      },
    },

    '& > $contentExpansionLink': {
      backgroundColor: keywords.transparent,
      border: keywords.none,
      color: colors.blue.show,
      font: {
        variant: 'small-caps',
        weight: 500,
      },
      padding: 'inherit',
      textDecoration: keywords.none,
      textTransform: 'capitalize',
      whiteSpace: 'nowrap',

      '&:active': { outline: keywords.none },
      '&:focus': { outline: keywords.none },
    },
  },
  showMoreWrapper: {
    padding: [0, '1rem'],
    position: 'relative',
    textAlign: 'center',
    width: '100%',

    '& $shown + $separatorFade:before': {
      opacity: 0,
    },
  },
  shown: {
    display: `block ${keywords.important}`,
  },
}), {
  styleName: 'ShowMoreStyles',
})(ShowMorePure);
