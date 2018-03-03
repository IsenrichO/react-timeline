import ContentDragSourcePure from './ContentDragSource.Pure';
import styler from '~/style/styler';

export default styler(({ colors, fonts, helpers, keywords, transitions }) => ({
  contentCard: {
    border: {
      color: colors.grey.iron,
      style: 'solid',
      width: 1,
    },
    cursor: '-webkit-grab',
  },
  addCardPanelButtonCard: {
    ...helpers.flexify(undefined, 'flex-start', ['center', 'center']),
    border: {
      color: colors.grey.primary,
      style: 'solid',
      width: 1,
    },
    cursor: 'pointer',
    backgroundColor: colors.white.primary,
    fontSize: fonts.size.button,
    height: 52,
    padding: [12, 8],
    transition: transitions.transitionAll(),
    width: 140,

    /**
     * One can use the `:active` pseudo-class to target and style
     * Drag-n-Drop enabled elements having an active drag state
     */
    '&:hover': {
      animation: {
        direction: 'normal',
        delay: null,
        duration: 100,
        fillMode: 'forwards',
        iterationCount: 1,
        name: 'hoverCard',
        timingFunction: 'ease-out',
      },
      backgroundColor: colors.grey.light,
      border: {
        color: colors.blue.accent,
        style: 'solid',
        width: 1,
      },
      filter: `drop-shadow(0 2px 2px ${colors.grey.primary})`,
    },

    '&:active': {
      backgroundColor: colors.blue.accent,
    },
  },
  addCardPanelButtonLabel: {
    color: colors.grey.dark,
    font: {
      size: fonts.size.small,
      lineHeight: `${fonts.size.medium}px`, // Necessary to prevent cutoff of letter descenders
    },
    marginLeft: 4,
    maxWidth: 42,
    textAlign: 'center',
  },
}), {
  styleName: 'ContentDragSourceStyles',
})(ContentDragSourcePure);
