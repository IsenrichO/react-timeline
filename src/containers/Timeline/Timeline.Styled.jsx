import TimelinePure from './Timeline.Pure';
import styler from '../../style/styler';

export const getEventFontStyles = (fonts, keywords) => ({
  family: fonts.face.material,
  lineHeight: 1,
  size: '3rem',
  stretch: keywords.normal,
  style: keywords.normal,
  variant: keywords.normal,
  weight: 'bold',
});

export const constructOrderedFontShorthand = ({ family, lineHeight = 1, size, style, variant, weight, ...rest }) =>
  `${style} ${variant} ${weight} ${size}/${lineHeight} ${family}`;

export default styler(({ colors, fonts, helpers, keywords }) => ({
  // Static `className` declarations necessary for nested references:
  timelineWithOpenInterval: {},

  timeline: {
    display: 'table',
    height: '100%',
    listStyle: keywords.none,
    margin: ['10vh', keywords.auto],
    maxWidth: 1450,
    padding: 0,
    position: 'relative',
    width: '75vw',

    '&:before': {
      backgroundColor: colors.white.primary,
      borderRadius: '1rem',
      bottom: '2rem',
      content: '""',
      height: keywords.auto,
      left: '50%',
      marginLeft: -2.5,
      position: 'absolute',
      top: '2rem',
      webkitFilter: `drop-shadow(0 0 7.5px ${colors.grey.medium})`,
      filter: `drop-shadow(0 0 7.5px ${colors.grey.medium})`, // eslint-disable-line sort-keys
      width: 5,
    },

    '&$timelineWithOpenInterval': {
      marginBottom: 0,

      '&:before': {
        bottom: '-10rem',
      },
    },
  },
  tlEventBeginning: {
    display: 'table-header-group',
    font: {
      family: fonts.face.material,
      lineHeight: 1,
      size: '3rem',
      stretch: keywords.normal,
      style: keywords.normal,
      variant: keywords.normal,
      weight: 'bold',
    },
    marginBottom: 0,
    textAlign: 'center',
    width: '100%',
  },
  tlEventEnd: {
    display: 'table-footer-group',
    font: getEventFontStyles(fonts, keywords),
    marginBottom: 0,
    textAlign: 'center',
    width: '100%',
  },
  tlMarkerBeginning: {
    backgroundColor: colors.white.background,
    border: {
      color: colors.white.background,
      radius: '50%',
      style: 'solid',
      width: 2,
    },
    boxShadow: {
      blur: 8,
      color: colors.black.backgroundSemiOp,
      inset: null,
      spread: null,
      x: 0,
      y: 0,
    },
    color: `${colors.black.primary} ${keywords.important}`,
    font: `${constructOrderedFontShorthand(getEventFontStyles(fonts, keywords))} ${keywords.important}`,
    marginBottom: '10vh',
    padding: '0.5rem',
    position: 'relative',
    top: 0,
  },
  tlMarkerEnd: {
    backgroundColor: colors.white.background,
    border: {
      color: colors.white.background,
      radius: '50%',
      style: 'solid',
      width: 2,
    },
    boxShadow: {
      blur: 8,
      color: colors.black.backgroundSemiOp,
      inset: null,
      spread: null,
      x: 0,
      y: 0,
    },
    color: `${colors.black.primary} ${keywords.important}`,
    font: `${constructOrderedFontShorthand(getEventFontStyles(fonts, keywords))} ${keywords.important}`,
    padding: '0.5rem',
    top: 0,
  },
}), {
  styleName: 'TimelineViewStyles',
})(TimelinePure);
