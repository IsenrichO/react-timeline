import ToastNotificationPure from './ToastNotification.Pure';
import styler from '../../style/styler';

export default styler(({ colors, fonts, helpers, keywords }) => ({
  // Static declarations necessary for subsequent reference(s):
  toastNotificationActionLabel: {},
  toastNotificationMessage: {},

  toastNotificationRootContainer: {
    bottom: keywords.unset,
    left: 0,
    top: '10vh',
  },
}), {
  styleName: 'ToastNotificationStyles',
})(ToastNotificationPure);
