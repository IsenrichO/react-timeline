import TagsTypeAheadInputPure from './TagsTypeAheadInput.Pure';
import styler from '~/style/styler';

export default styler(({ colors, fonts, helpers, keywords }) => ({
  // Static declarations necessary for subsequent reference(s):
  tagsChipInputError: {},
  tagsChipInputHint: {},
  tagsChipInputLabel: {},
}), {
  styleName: 'TagsTypeAheadStyles',
})(TagsTypeAheadInputPure);
