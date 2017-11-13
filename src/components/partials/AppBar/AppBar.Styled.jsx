import AppBarPure from './AppBar.Pure';
import styler from '../../../style/styler';

export default styler(({ colors, keywords }) => ({
  appBarLogo: {},
  appBarRootNode: {
    backgroundColor: `${colors.red.primary} ${keywords.important}`,
    left: 0,
    position: `fixed ${keywords.important}`,
    top: 0,
  },
}), {
  styleName: 'AppBarStyles',
})(AppBarPure);
