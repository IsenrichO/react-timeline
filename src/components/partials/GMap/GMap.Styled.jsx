import GMapPure from './GMap.Pure';
import styler   from '~/style/styler';

export default styler(({ colors, fonts, helpers }) => ({
  // Static declarations necessary for subsequent reference(s):

  fullSizeGmapContainer: {
    height: '-webkit-fill-available',
    width: '100%',
  },
  gmapContainer: {
    position: 'relative',
  },
  gmapWrapper: {
    ...helpers.styleInheritor('height', 'width'),
  },
  gmapWrapperOld: {
    height: 200,
    width: '100%',
  },
}), {
  styleName: 'GMapStyles',
})(GMapPure);
