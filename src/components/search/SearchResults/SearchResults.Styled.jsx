import SearchResultsPure from './SearchResults.Pure';
import styler from '~/style/styler';

export default styler(({ colors, fonts, helpers, keywords }) => ({
  // Static declarations necessary for subsequent reference(s):
  searchResultEvent: {},

  searchResultsContainer: {
    ...helpers.flexify('column', 'flex-start', ['flex-start'], [], 'wrap', 'inline-flex'),
    height: '100%',
    listStyle: keywords.none,
    margin: ['2vw', 0],
    padding: 0,
    width: '100%',

    '& $searchResultEvent': {
      margin: [0, 0, '2vh', `${10 / 3}%`],
      maxHeight: 792, // => Card height when map & photo sections are expanded
      maxWidth: 600,
      width: '45%',

      '&:last-child': { marginRight: `${10 / 3}%` },
    },
  },
}), {
  styleName: 'SearchResultsStyles',
})(SearchResultsPure);
