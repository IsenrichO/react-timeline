import SelectableListPure from './SelectableList.Pure';
import styler from '../../style/styler';

export default styler(({ colors, fonts, helpers, keywords }) => ({
  // Static `className` declarations necessary for nested references:
  drawerItemEmptySummarySnippet: {},

  selectableListComposedComponent: {
    counterReset: `selectionList ${0}`, // Initialize counter at 0
  },
  drawerItemSummarySnippet: {
    ...helpers.hideOverflow,
    fontStyle: 'italic',
    whiteSpace: 'pre-wrap',
  },
  eventsDrawerMenuItem: {
    ...helpers.hideOverflow,
    display: '-webkit-box',
    font: {
      lineHeight: '22px',
      size: fonts.size.listItemHeader,
      weight: 300,
    },
    margin: keywords.auto,
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    whiteSpace: 'pre-wrap',

    '&:before': {
      border: {
        color: colors.black.diesel,
        radius: 50,
        style: 'solid',
        width: 2,
      },
      content: 'counter(selectionList)',
      counterIncrement: `selectionList ${1}`, // Unit-increment counter
      font: {
        size: '2rem',
        lineHeight: '33px',
      },
      height: 35,
      left: 19, // (72px / 2) - (35px / 2) => 19px
      letterSpacing: '17px',
      paddingLeft: 8,
      position: 'absolute',
      textAlign: 'center',
      top: 20,
      width: 35,
    },
  },
}), {
  styleName: 'SelectableListStyles',
})(SelectableListPure);
