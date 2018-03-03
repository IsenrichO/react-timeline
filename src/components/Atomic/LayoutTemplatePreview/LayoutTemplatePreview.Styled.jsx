import LayoutTemplatePreviewPure from './LayoutTemplatePreview.Pure';
import styler from '~/style/styler';

export default styler(({ colors, fonts, helpers, keywords, transitions }) => ({
  layoutDescriptionContainer: {
    backgroundColor: colors.white.primary,
    borderTop: {
      color: colors.grey.granite,
      style: 'solid',
      width: 1,
    },
    height: 74,
    padding: [4, 12],
    textAlign: 'start',
  },
  layoutTemplateCaption: {
    color: colors.grey.medium,
    font: {
      family: fonts.face.default,
      lineHeight: `${fonts.size.medium}px`,
      size: fonts.size.label,
    },
  },
  layoutTemplateContainer: {
    border: {
      color: colors.grey.iron,
      style: 'solid',
      width: 1,
    },
    boxShadow: {
      blur: 10,
      color: colors.black.boxShadow,
      inset: null,
      spread: 2,
      x: 0,
      y: 0,
    },
    cursor: 'pointer',
    height: 262,
    transition: transitions.hoverTransition({ delay: null }),
    width: 154,

    '&:hover': {
      borderColor: colors.blue.accent,
      boxShadow: {
        blur: 10,
        color: colors.black.backgroundSemiOp,
        inset: null,
        spread: 1,
        x: 0,
        y: 4,
      },
    },
  },
  layoutTemplateLabel: {
    color: colors.blue.accent,
    font: {
      family: fonts.face.default,
      lineHeight: `${fonts.size.large}px`,
      size: fonts.size.medium,
    },
    margin: [0, keywords.auto, 4],
  },
  layoutVisualizationContainer: {
    ...helpers.flexify('column', 'center', ['center']),
    height: 186,
    padding: 17,
  },
  templateTableBlock: {
    backgroundColor: colors.grey.granite,
    height: 32,
    maxWidth: 120,
  },
  templateTableRow: {
    ...helpers.flexify('row', 'space-between', ['center', 'center']),
    position: 'relative',
    width: '100%',

    '& + &': {
      marginTop: 8,
    },
  },
  templateTableSquareBlock: {
    height: 55,
  },
}), {
  styleName: 'LayoutTemplatePreviewStyles',
})(LayoutTemplatePreviewPure);
