import SearchBoxPure from './SearchBox.Pure';
import styler, { aesthetic } from '~/style/styler';

const { colors: baseThemeColors } = aesthetic.themes.base;
const expandingSearchInputStyles = (colors = baseThemeColors.white.pure) => ({
  backgroundColor: colors.white.pure,
  width: 'calc(100% - 40px)',
});

export default styler(({ colors, fonts, helpers, keywords, imageAssets }) => ({
  searchBox: {
    ...helpers.flexify('row', 'flex-start', ['center', 'center']),
    height: 32,
    left: '1rem',
    position: 'relative',
    top: '5.5rem',
    width: '80%',
  },
  searchInputField: {
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    borderRadius: '1rem',
    height: 32,
    position: 'relative',
    transition: {
      delay: 100,
      duration: 500,
      property: 'all',
      timingFunction: 'ease-in-out',
    },
    width: '8rem',

    '&:hover': {
      ...expandingSearchInputStyles(colors),
    },
  },
  searchMagnifyingGlassGlyph: {
    position: 'relative',
    width: 32,

    '&:before': {
      ...helpers.styleInheritor('height', 'width'),
      content: '""',
      cursor: 'pointer',
      position: 'absolute',
    },

    '&:hover + $searchInputField': {
      ...expandingSearchInputStyles(colors),
    },
  },
}), {
  styleName: 'SearchBoxStyles',
})(SearchBoxPure);
