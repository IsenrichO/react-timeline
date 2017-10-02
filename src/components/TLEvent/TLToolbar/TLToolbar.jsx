import TLToolbarPure from './TLToolbar.Pure';
import styler from '../../../style/styler';

export default styler(({ colors, fonts, keywords }) => ({
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
    '&:hover': {
      backgroundColor: `${colors.red.primary} ${keywords.important}`,
    },
  },
  inverted: {
    left: 'calc(100% + 1.6rem)',
  },
}), {
  styleName: 'TimelineToolbarStyles',
})(TLToolbarPure);
