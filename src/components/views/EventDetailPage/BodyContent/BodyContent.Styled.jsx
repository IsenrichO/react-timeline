import BodyContentPure from './BodyContent.Pure';
import styler          from '~/style/styler';

export default styler(({ colors, helpers, keywords }) => ({
  bodyContainer: {
    ...helpers.flexify('row', 'space-around', ['center', 'center']),
    backgroundColor: colors.white.background,
    border: {
      color: colors.grey.medium,
      style: 'solid',
      width: 1,
    },
    margin: 0,
    overflow: 'hidden',
    padding: '2%',
    position: 'relative',
    top: 600,
  },
  bodyContainerWithContent: {
    border: keywords.none,
  },
  layoutTemplatePreviewsContainer: {
    ...helpers.multiPropertyStyle('10%', ['margin', 'padding']),
  },
}), {
  styleName: 'EDPBodyContentStyles',
})(BodyContentPure);
