import ContentRevealAccordionPure from './ContentRevealAccordion.Pure';
import styler from '../../../style/styler';

export default styler(({ colors, fonts, helpers, keywords, transitions }) => ({
  // Static `className` declarations necessary for nested references:
  active: {},

  accordionContainer: {
    // Remove focus ring produced as consequence of making `<div />` tabbable/focusable:
    '&:focus': {
      outline: keywords.none,
    },
  },
  accordionToggleBtn: {
    background: keywords.none,
    border: keywords.none,
    padding: 0,
    textAlign: 'start',
    width: '100%',
  },
  bodyFieldIcon: {
    fontSize: `${fonts.size.large}px ${keywords.important}`,
    marginRight: '1rem',
  },
  contentSectionLabel: {
    ...helpers.hideOverflow,
  },
  eventPanelBodyAccordionSection: {
    height: 37,
    overflow: 'hidden',
    padding: [0, '1.25rem'],
    transition: transitions.accordionReveal(),

    '&:hover': {
      backgroundColor: colors.white.eggShell,
    },
  },
  tlRowSummary: {
    ...helpers.flexify('row', 'flex-start', ['center', 'center']),
    maxHeight: 37,
    padding: ['0.75rem', 0],

    '&:hover $toggleGlyph': {
      transform: 'scale(1.25)',
    },

    '& > em': {
      width: '100%',
    },
  },
  toggleGlyph: {
    float: 'right',
    font: {
      lineHeight: `${fonts.size.large}px`,
      size: `2rem ${keywords.important}`,
    },
    position: 'relative',
    right: '-0.5rem',
    transition: helpers.condenseStyles({
      duration: 750,
      delay: 125, // eslint-disable-line sort-keys
      property: 'transform',
      timingFunction: 'ease',
    }, true),

    '&$active': {
      transform: 'rotateZ(90deg)',
    },
  },
}), {
  styleName: 'ContentRevealAccordionStyles',
})(ContentRevealAccordionPure);
