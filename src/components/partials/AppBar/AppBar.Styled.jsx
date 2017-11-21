import AppBarPure from './AppBar.Pure';
import styler from '../../../style/styler';

export default styler(({ colors, fonts, helpers, keywords }) => ({
  // Static `className` declarations necessary for nested references:
  appBarLeftIcon: {},
  appBarLeftIconTooltip: {},
  appBarRightIcon: {},

  appBarHeader: {
    ...helpers.flexify('row', 'center', ['center', 'center']),
    font: {
      family: fonts.face.title,
      lineHeight: `${fonts.size.appBar}px`,
      size: fonts.size.title,
      weight: 'lighter',
    },
    position: 'relative',
  },
  appBarLogo: {
    height: 36,
    margin: [keywords.auto, '1rem'],
  },
  appBarRootNode: {
    backgroundColor: `${colors.red.primary} ${keywords.important}`,
    left: 0,
    position: `fixed ${keywords.important}`,
    top: 0,
  },
  appBarTitle: {
    ...helpers.styleInheritor('font'),
    margin: [keywords.auto, '1rem'],
  },
}), {
  styleName: 'AppBarStyles',
})(AppBarPure);
