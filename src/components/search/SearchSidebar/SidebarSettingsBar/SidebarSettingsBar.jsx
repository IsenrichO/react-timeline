import SidebarSettingsBarPure from './SidebarSettingsBar.Pure';
import styler from '../../../../style/styler';

export default styler(({ colors, helpers }) => ({
  // Static declarations necessary for subsequent reference(s):
  collapseSidebarButton: {},

  sidebarSettingsBar: {
    ...helpers.flexify('row', 'flex-end', ['center', 'center']),
    ...helpers.styleInheritor('width'),
    backgroundColor: colors.red.dark,
    borderTop: {
      color: colors.white.pure,
      style: 'solid',
      width: 1,
    },
    bottom: 0,
    height: 64,
    position: 'fixed',
  },
}), {
  styleName: 'SidebarSettingsBarStyles',
})(SidebarSettingsBarPure);
