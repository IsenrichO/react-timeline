import TLToolbarPure from './TLToolbar.Pure';
import styler        from '~/style/styler';

export default styler(({ colors, fonts, keywords, transitions }) => ({
  tlToolbar: {
    opacity: 0,
    position: 'absolute',
    right: 'calc(100% + 1.6rem)',
    transition: {
      delay: 250,
      duration: 250,
      property: 'all',
      timingFunction: 'cubic-bezier(0, 0.25, 0.70, 0.40)',
    },
    visibility: 'hidden',
  },
  toolbarBtn: {
    backgroundColor: colors.white.primary,
    border: 'none',
    borderRadius: '50%',
    boxShadow: {
      blur: 10,
      color: colors.black.boxShadow,
      inset: null,
      spread: 1,
      x: 0,
      y: 0,
    },
    font: {
      family: fonts.face.default,
      size: '1.5rem',
      stretch: 'normal',
      style: 'normal',
      variant: 'normal',
      weight: 700,
    },
    height: '2.5rem',
    marginBottom: '1rem',
    textAlign: 'center',
    width: '2.5rem',
  },
  toolbarFontIcon: {
    backgroundColor: colors.white.primary,
    border: keywords.none,
    borderRadius: '50%',
    boxShadow: {
      blur: 10,
      color: colors.black.boxShadow,
      inset: null,
      spread: 3,
      x: 0,
      y: 0,
    },
    font: {
      stretch: keywords.normal,
      style: keywords.normal,
      variant: keywords.normal,
    },
    fontFamily: `${fonts.face.neue} ${keywords.important}`,
    fontSize: `1.7rem ${keywords.important}`,
    fontWeight: `700 ${keywords.important}`,
    lineHeight: `1.5 ${keywords.important}`,
    height: `2.5rem ${keywords.important}`,
    marginBottom: '1rem',
    textAlign: 'center',
    transition: transitions.transitionAll(),
    width: `2.5rem ${keywords.important}`,

    '&:hover': {
      backgroundColor: `${colors.red.primary} ${keywords.important}`,
      boxShadow: {
        blur: 10,
        color: colors.black.boxShadowHover,
        inset: null,
        spread: 1,
        x: 0,
        y: 2,
      },
      color: colors.white.primary,
    },
  },
  inverted: {
    left: 'calc(100% + 1.6rem)',
  },
  tlToolbarIconButton: {
    height: '2.5rem',
    padding: 0,
    width: '2.5rem',
    zIndex: 1,
  },
  tlToolbarTooltip: {
    display: `block ${keywords.important}`, // Override MuiTooltip's `inline` display
    marginBottom: '2rem',
    zIndex: 2,
  },
  tlToolbarTooltipNoWrap: {
    whiteSpace: 'nowrap',
  },
}), {
  styleName: 'TimelineToolbarStyles',
})(TLToolbarPure);
