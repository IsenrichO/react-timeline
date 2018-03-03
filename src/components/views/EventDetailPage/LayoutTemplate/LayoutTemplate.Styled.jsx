import LayoutTemplatePure from './LayoutTemplate.Pure';
import styler from '~/style/styler';

export default styler(({ colors, fonts, helpers }) => ({
  templateBlock: {
    backgroundColor: colors.grey.granite,
    height: 350,
  },
  templateContainer: {
    ...helpers.flexify('column'),
    width: '100%',
  },
  templateRow: {
    ...helpers.flexify('row', 'space-between', ['center', 'center']),
    width: '100%',
    height: 350,

    '&:not(:last-child)': {
      marginBottom: 20,
    },
  },
  templateSquareBlock: {},
}), {
  styleName: 'LayoutTemplateStyles',
})(LayoutTemplatePure);
