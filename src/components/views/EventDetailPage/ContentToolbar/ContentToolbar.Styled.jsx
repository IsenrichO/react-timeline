import ContentToolbarPure from './ContentToolbar.Pure';
import styler from '~/style/styler';

export default styler(({ colors, fonts, helpers, keywords, transitions }) => ({
  contentToolbarContainer: {
    ...helpers.hide,
    ...helpers.flexify('row', 'space-around', ['center']),
    ...helpers.multiPropertyStyle('100%', ['top', 'width']),
    backgroundColor: colors.grey.iron,
    overflow: 'hidden',
    position: 'relative',
    textAlign: 'center',
    transition: transitions.transitionAll(),
  },
  contentToolbarVisible: {
    ...helpers.visible,
    animation: {
      delay: 250,
      direction: keywords.normal,
      duration: 500,
      fillMode: 'forwards',
      iterationCount: 1,
      name: 'dropIn',
      timingFunction: 'linear',
    },
    height: 100,
  },
}), {
  styleName: 'ContentToolbarStyles',
})(ContentToolbarPure);
