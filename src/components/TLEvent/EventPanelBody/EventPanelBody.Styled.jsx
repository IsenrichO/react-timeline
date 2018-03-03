import EventPanelBodyPure    from './EventPanelBody.Pure';
import styler, { aesthetic } from '~/style/styler';

const { colors: baseThemeColors } = aesthetic.themes.base;

export const quotesPseudoShared = (color = baseThemeColors.grey.border) => ({
  color,
  font: {
    family: '-webkit-pictograph, sans-serif',
    lineHeight: 1,
    size: '5.5rem',
    style: 'italic',
    weight: 'bold',
  },
  position: 'absolute',
});

export default styler(({ colors, fonts, helpers, keywords, imageAssets }) => ({
  // Static `className` declarations necessary for nested references:
  accordionToggleBtn: {},
  bodyFieldIcon: {},
  collapsibleDescription: {},
  emptySummary: {},
  hidden: {},
  shown: {},
  tlDescription: {},

  // accordionContainer: {
  //   // Remove focus ring produced as consequence of making `<div />` tabbable/focusable:
  //   '&:focus': {
  //     outline: keywords.none,
  //   },
  // },
  bodyText: {
    display: `block ${keywords.important}`,
    lineHeight: 1.2,

    '&$emptySummary': {
      background: {
        attachment: null,
        color: keywords.transparent,
        image: `url("${imageAssets.emptyContent}")`,
        position: 'center',
        repeat: 'repeat',
      },
      backgroundClip: 'content-box',
      height: 50,
    },

    '&$hidden': {
      height: '6em',
    },
  },
  // contentSectionLocation: {
  //   ...helpers.hideOverflow,
  // },
  // eventPanelBodyAccordionSection: {
  //   height: 35,
  //   overflow: 'hidden',
  //   padding: [0, '1.25rem'],
  //   transition: transitions.accordionReveal,

  //   '&:hover': {
  //     backgroundColor: colors.white.eggShell,
  //   },
  // },
  panelBody: {
    border: 'none',
    margin: ['1rem', 0],
    position: 'relative',
    width: '100%',

    '& $accordionToggleBtn': {
      background: keywords.none,
      border: keywords.none,
      padding: 0,
      textAlign: 'start',
      width: '100%',
    },

    '& [class^="material-icons"]': {},

    '& $bodyFieldIcon': {
      fontSize: `${fonts.size.large}px ${keywords.important}`,
      marginRight: '1rem',
    },

    '& $tlDescription': {
      padding: [0, '1.25rem'],
      position: 'relative',

      '&$collapsibleDescription': {
        '&::after': {
          bottom: '-3.50rem',
        },
      },

      '&::after': {
        ...quotesPseudoShared(colors.red.translucent),
        bottom: '-3.50rem',
        content: 'close-quote',
        right: '1.25rem',
      },

      '&::before': {
        ...quotesPseudoShared(colors.red.translucent),
        content: 'open-quote',
        left: '0.05rem',
        top: '-0.90rem',
      },
    },
  },
  panelBodyDivider: {
    margin: ['1.428571rem', '1.25rem'],
  },
  tlDate: {
    ...helpers.flexify('row', 'flex-start', ['center', 'center']),
  },
  // tlRowSummary: {
  //   ...helpers.flexify('row', 'flex-start', ['center', 'center']),
  //   padding: ['0.75rem', 0],

  //   '&:hover $toggleGlyph': {
  //     transform: 'scale(1.25)',
  //   },

  //   '& > em': {
  //     width: '100%',
  //   },
  // },
  // toggleGlyph: {
  //   float: 'right',
  //   font: {
  //     lineHeight: '16px',
  //     size: `2rem ${keywords.important}`,
  //   },
  //   position: 'relative',
  //   right: '-0.5rem',
  //   transition: helpers.condenseStyles({
  //     duration: 750,
  //     delay: 125, // eslint-disable-line sort-keys
  //     property: 'transform',
  //     timingFunction: 'ease',
  //   }, true),

  //   '&$active': {
  //     transform: 'rotateZ(90deg)',
  //   },
  // },
}), {
  styleName: 'EventPanelBodyStyles',
})(EventPanelBodyPure);
