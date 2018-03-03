import LayoutTemplateDropTargetPure from './LayoutTemplateDropTarget.Pure';
import styler                       from '~/style/styler';

export default styler(({ colors, fonts, helpers, keywords, transitions }) => ({
  // Static `className` declarations necessary for nested references:
  layoutDropTargetHoverState: {},

  addMediaEmbedIndicator: {
    ...helpers.flexify('row', 'center', ['center', 'center']),
    fontSize: fonts.size.colossal,
    height: '100%',
  },
  layoutDropTarget: {
    transition: transitions.transitionAll(),

    '&$layoutDropTargetHoverState': {
      backgroundColor: colors.grey.iron,
    },
  },
}), {
  styleName: 'LayoutTemplateDropTargetStyles',
})(LayoutTemplateDropTargetPure);
