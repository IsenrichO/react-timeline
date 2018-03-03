import ButtonControlsPure from './ButtonControls.Pure';
import styler             from '~/style/styler';

export default styler(({ colors, fonts, helpers, keywords, transitions }) => ({
  // Static declarations necessary for subsequent reference(s):
  buttonControlsContainer: {},
  childButtonControlIcon: {},
  childButtonControlTooltip: {},

  childButtonControl: {
    ...helpers.flexify('row', 'center', ['center', 'center']),
    backgroundColor: colors.white.primary,
    border: keywords.none,
    borderRadius: 50,
    boxShadow: {
      blur: 12,
      color: 'rgba(0, 0, 0, 0.2)',
      inset: null,
      spread: 1,
      x: 0,
      y: 0,
    },
    color: colors.grey.buttonControl,
    position: 'fixed',
    transition: transitions.buttonRevealTransition(),

    '&:hover': {
      backgroundColor: colors.white.smoke,
      boxShadow: {
        blur: 3,
        color: 'rgba(0, 0, 0, 0.26)',
        inset: null,
        spread: null,
        x: 0,
        y: 1,
      },
    },

    '& $childButtonControlIcon': {
      ...helpers.markObjectValuesImportant(helpers.styleInheritor('height', 'width')),
      boxSizing: `content-box ${keywords.important}`,
      font: {
        lineHeight: `46px ${keywords.important}`,
        size: `2rem ${keywords.important}`,
      },
      padding: `0 ${keywords.important}`,
    },

    '&:first-child': { transitionDelay: 25 },
    '&:nth-child(2)': { transitionDelay: 100 },
    '&:nth-child(3)': { transitionDelay: 175 },
    '&:last-child': { transitionDelay: 250 },

    // @include nthChildIterator(transition-delay, 4, 0.05);
    // i {
    //   font-size: 1.5rem;
    //   line-height: 1;
    // }
  },
  mainButtonControls: {
    ...helpers.flexify('row', 'center'),
    backgroundColor: colors.red.primary,
    border: 'none',
    borderRadius: '50%',
    bottom: '3rem',
    color: colors.white.primary,
    fontSize: '5rem',
    height: '5rem',
    margin: 0,
    padding: 0,
    position: 'fixed',
    right: '3rem',
    top: 'auto !important',
    width: '5rem',
    zIndex: 10,
  },
  mainButtonIcon: {
    color: colors.white.primary,
    fontSize: `50% ${keywords.important}`,
  },
  mainButtonShadow: {
    borderRadius: 50,
    bottom: '3rem',
    boxShadow: {
      blur: 10,
      color: 'rgba(0, 0, 0, 0.3)',
      inset: null,
      spread: null,
      x: 0,
      y: 6,
    },
    height: '5rem',
    position: 'fixed',
    right: '3rem',
    top: `${keywords.auto} ${keywords.important}`,
    width: '5rem',
    zIndex: 0,
  },
}), {
  styleName: 'ButtonControlsStyles',
})(ButtonControlsPure);

// > i {
//   display: block;
//   left: 2px;
//   top: -1px;
//   font-size: 2.5rem;
//   height: 100%;
//   line-height: 5rem;
// }
// &-child {
//   @include nthChildIterator(transition-delay, 4, 0.05);
//   @include flex(flex, row, center, center);
//   position: fixed;
//   border: none;
//   border-radius: 50%;
//   background-color: $theme-content-lt;
//   box-shadow: 0 0 12px 1px rgba(0, 0, 0, 0.2);
//   color: #8898A5;
//   transition: all 0.25s cubic-bezier(0, 0.44, 0.94, 1.29);
//   .glyphicon { font-size: 1.5rem; }
//   &:hover {
//     background: #F5F5F5;
//     box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.26);
//   }
//   i {
//     font-size: 1.5rem;
//     line-height: 1;
//   }
// }
