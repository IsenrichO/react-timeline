import SearchResultsPure from './SearchResults.Pure';
import styler from '../../../style/styler';

export default styler(({ colors, fonts, helpers, keywords }) => ({
  searchResultsStarred: {
    ...helpers.flexify('row', 'flex-start', ['flex-start'], [], 'wrap', 'inline-flex'),
    height: '100%',
    listStyle: keywords.none,
    margin: ['2vw', 0],
    padding: 0,
  },
}), {
  styleName: 'SearchResultsStyles',
})(SearchResultsPure);
