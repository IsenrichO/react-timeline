import DateViewScrollerPure from './DateViewScroller.Pure';
import styler from '~/style/styler';

export default styler(({ colors, constants, fonts, helpers, keywords }) => ({
  // Static declarations necessary for subsequent reference(s):
  dateViewScrollerAlignRight: {},
  dateViewScrollerAlignTop: {},
  dateViewScrollerHorizontal: {},

  dateViewScrollerContainer: {
    color: colors.grey.primary,
    cursor: 'row-resize',
    left: 0,
    position: 'fixed',
    top: constants.HEIGHT_OFFSET_VP,
    width: 80,

    '&$dateViewScrollerAlignRight': {
      left: keywords.auto,
      right: 12, // Added offset from scrollbar
    },

    '&$dateViewScrollerHorizontal': {
      bottom: 0,
      cursor: 'col-resize',
      height: 80,
      width: '100vw',

      '&$dateViewScrollerAlignTop': {
        bottom: keywords.auto,
        top: 0,
      },
    },
  },
  yearMarker: {
    padding: [0, 8],
  },
}), {
  styleName: 'DateViewScrollerStyles',
})(DateViewScrollerPure);
