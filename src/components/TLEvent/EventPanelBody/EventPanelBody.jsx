import EventPanelBodyPure from './EventPanelBody.Pure';
import styler, { aesthetic } from '../../../style/styler';

const { colors: themeColors } = aesthetic.themes.base;

const TlLocNPhotos = {
  cursor: 'pointer',
  height: 16,
  margin: ['1rem', 0, 0],
  overflow: 'hidden',
  transition: {
    delay: 125,
    duration: 750,
    property: 'height',
    timingFunction: 'ease',
  },
};

const quotesPseudoShared = (color = themeColors.grey.border) => ({
  color,
  font: {
    family: '-webkit-pictograph, sans-serif',
    lineHeight: 1,
    size: '2.5rem',
    style: 'italic',
    weight: 'bold',
  },
  position: 'absolute',
});

export default styler(({ colors, fonts, helpers, keywords, imageAssetUrls }) => ({
  // Static `className` declarations necessary for nested references:
  accordionContainer: {},
  accordionToggleBtn: {},
  active: {},
  bodyFieldIcon: {},
  collapsibleDescription: {},
  emptySummary: {},
  hidden: {},
  panelBodyDivider: {},
  shown: {},
  tlDescription: {},

  bodyText: {
    display: `block ${keywords.important}`,
    lineHeight: 1.2,

    '&$emptySummary': {
      background: {
        attachment: null,
        color: keywords.transparent,
        image: `url("${imageAssetUrls.emptyContent}")`,
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
  panelBody: {
    border: 'none',
    padding: '1.25rem',
    position: 'relative',
    width: '100%',

    '& $accordionToggleBtn': {
      background: keywords.none,
      border: keywords.none,
      padding: 0,
      textAlign: 'start',
      width: '100%',
    },

    '& [class^="material-icons"]': {
      fontSize: fonts.size.large,
    },

    '& $bodyFieldIcon': {
      color: colors.red.primary,
      marginRight: '1rem',
      position: 'relative',
      top: 2,
    },

    '& $tlDescription': {
      margin: ['1rem', 0, 0],
      position: 'relative',

      '&$collapsibleDescription': {
        '&::after': {
          bottom: '-0.50rem',
        },
      },

      '&::after': {
        ...quotesPseudoShared(colors.grey.border),
        bottom: '-1.50rem',
        content: 'close-quote',
        right: 0,
      },

      '&::before': {
        ...quotesPseudoShared(colors.grey.border),
        content: 'open-quote',
        left: '-0.75rem',
        top: '-0.75rem',
      },
    },
  },
  tlDate: {
    margin: ['1rem', 0, 0],
  },
  tlLocation: { ...TlLocNPhotos },
  tlPhotos: { ...TlLocNPhotos },
  tlRowSummary: {
    ...helpers.flexify('row', 'flex-start'),
    margin: ['1rem', 0, 0],
    marginTop: `0 ${keywords.important}`,

    '& > em': {
      width: '100%',
    },
  },
  toggleGlyph: {
    float: 'right',
    font: {
      lineHeight: '16px',
      size: `2rem ${keywords.important}`,
    },
    position: 'relative',
    right: '-0.5rem',
    transition: {
      delay: 125,
      duration: 750,
      property: 'transform',
      timingFunction: 'ease',
    },

    '&$active': {
      transform: 'rotateZ(90deg)',
    },
  },
}), {
  styleName: 'EventPanelBodyStyles',
})(EventPanelBodyPure);
