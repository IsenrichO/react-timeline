import ProgressionLoaderPure from './ProgressionLoader.Pure';
import styler from '../../../style/styler';

export default styler(({ colors, fonts, helpers }) => ({
  // Static `className` declarations necessary for nested references:
  progLoaderContainer: {},
}), {
  styleName: 'ProgressionLoaderStyles',
})(ProgressionLoaderPure);
