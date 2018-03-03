import PortalWrapperPure from './PortalWrapper.Pure';
import styler from '~/style/styler';

export default styler(({ colors }) => ({
  // Static declarations necessary for subsequent reference(s):
  portalWrapper: {},
}), {
  styleName: 'PortalWrapperStyles',
})(PortalWrapperPure);
