import StaticGMapPure from './StaticMap.Pure';
import styler from '../../../style/styler';

export default styler(({ colors }) => ({
  staticMapImage: {
    marginLeft: '0.714286rem',
    width: 'calc(100% - 0.714286rem)',
  },
  staticMapWrapper: {
    borderLeft: {
      color: colors.red.primary,
      style: 'dashed',
      width: 'thin',
    },
    margin: ['0.5rem', 0, '0.25rem', '0.5rem'],
    position: 'relative',
  },
}), {
  styleName: 'StaticGoogleMapStyles',
})(StaticGMapPure);
