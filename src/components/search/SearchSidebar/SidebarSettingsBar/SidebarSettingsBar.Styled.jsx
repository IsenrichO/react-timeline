import SidebarSettingsBarPure from './SidebarSettingsBar.Pure';
import styler                 from '~/style/styler';

export default styler(({ colors, fonts, helpers }) => ({
  // Static declarations necessary for subsequent reference(s):

  collapseSidebarButton: {
    height: 64,
    padding: 8,
    width: 64,
  },
  sidebarCloseIconTooltip: {
    left: '100%',
    transform: 'translateY(50%)',
    zIndex: 30,
  },
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
  sidebarToggleIcon: {
    fontSize: fonts.size.subTitle,
    height: 64,
    width: 64,
  },
}), {
  styleName: 'SidebarSettingsBarStyles',
})(SidebarSettingsBarPure);
