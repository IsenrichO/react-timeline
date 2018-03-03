import RichTextEditorPure from './RichTextEditor.Pure';
import styler from '~/style/styler';

export default styler(({ colors, fonts, helpers, keywords }) => ({
  // Static `className` declarations necessary for nested references:

  richTextEditorContainer: {},
}), {
  styleName: 'RichTextEditorStyles',
})(RichTextEditorPure);
