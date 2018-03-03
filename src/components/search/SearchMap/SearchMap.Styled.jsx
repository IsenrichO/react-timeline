import SearchMapPure from './SearchMap.Pure';
import styler        from '~/style/styler';

export default styler(({ colors, fonts, helpers }) => ({
  // Static declarations necessary for subsequent reference(s):

  atlasViewContainer: {
    ...helpers.flexify('row', 'center', ['center', 'center']),
    width: '-webkit-fill-available',
  },
  stepActionsContainer: {
    marginTop: 18,
  },
  stepperContainer: {
    minWidth: 255, // To ensure step action buttons can be arranged side-by-side
    width: '25vw',
  },
}), {
  styleName: 'SearchMapStyles',
})(SearchMapPure);
