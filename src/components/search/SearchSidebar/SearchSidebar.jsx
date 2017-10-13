import SearchSidebarPure from './SearchSidebar.Pure';
import styler from '../../../style/styler';

export default styler(({ colors, fonts, helpers, keywords, transitions }) => ({
  // Static declarations necessary for subsequent reference(s):
  searchCategoryAccordion: {},
  searchCategoryActive: {},
  searchCategoryCondensed: {},
  searchCategoryIconCondensed: {},
  searchSidebarCollapsed: {},
  sidebarHomeIconTooltip: {},

  activeFilterIndicator: {
    alignSelf: 'center',
    position: 'absolute',
    right: '2rem',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  fixedPositioningContainer: {
    ...helpers.styleInheritor('height', 'width'),
    backgroundColor: colors.blue.primary,
    boxShadow: {
      blur: 16,
      color: colors.grey.boxShadow,
      inset: null,
      spread: 4,
      x: -2,
      y: 0,
    },
    position: 'fixed',
  },
  homeSidebarButton: {
    font: {
      family: fonts.face.neue,
      lineHeight: 0.5,
      size: '4rem',
      style: keywords.normal,
      weight: 'lighter',
    },
    margin: `1rem ${keywords.important}`,
    position: `absolute ${keywords.important}`,
    right: 0,
    top: 0,
  },
  searchCategory: {
    borderBottom: {
      color: colors.grey.granite,
      style: 'solid',
      width: 2,
    },
    cursor: 'pointer',
    position: 'relative',
    top: '10rem',
    width: '100%',

    '&:first-child': {
      borderTop: {
        color: colors.grey.granite,
        style: 'solid',
        width: 2,
      },
    },

    '&:hover': {
      backgroundColor: colors.grey.hover,
      zIndex: 0,
    },

    '&$searchCategoryActive': {
      backgroundColor: colors.grey.hover,

      /**
       * '&:not($searchCategoryCondensed):before': {
       *   borderBottom: {
       *     color: keywords.transparent,
       *     style: 'solid',
       *     width: 34,
       *   },
       *   borderLeft: {
       *     color: colors.white.pure,
       *     style: 'solid',
       *     width: 18,
       *   },
       *   borderTop: {
       *     color: keywords.transparent,
       *     style: 'solid',
       *     width: 34,
       *   },
       *   content: '""',
       *   height: '100%',
       *   left: 0,
       *   position: 'absolute',
       *   top: 0,
       * },
       */

      '& $searchCategoryIconCondensed': {
        color: `${colors.red.primary} ${keywords.important}`,
      },
    },

    '&$searchCategoryCondensed': {
      ...helpers.flexify('column', 'center', ['center', 'center']),
      height: 64,
    },
  },
  searchCategoryIcon: {
    ...helpers.styleInheritor('lineHeight'),
    color: `${colors.white.pure} ${keywords.important}`,
    fontSize: `2.571429rem ${keywords.important}`,
    marginRight: '3rem',

    '&$searchCategoryIconCondensed': {
      fontSize: `3.5rem ${keywords.important}`,
      margin: keywords.auto,
      textAlign: 'center',
      width: 64,
    },
  },
  searchCategoryTitle: {
    ...helpers.flexify('row', 'flex-start'),
    color: colors.white.pure,
    font: {
      family: fonts.face.raleway,
      lineHeight: '50px',
      size: 22,
    },
    margin: 0,
    padding: ['0.5rem', '2rem', '0.5rem', '3rem'],
    position: 'relative',

    '&$searchCategoryAccordion:after': {
      content: '&#43;', // Octal Literal: `\002B`
      font: {
        family: fonts.face.raleway,
        lineHeight: 1,
        size: '3.5rem',
        style: keywords.normal,
        weight: 'lighter',
      },
      position: 'absolute',
      right: '2rem',
    },

  },
  searchSidebar: {
    height: '100vh',
    minWidth: 408,
    position: 'relative',
    transition: transitions.transitionAll,
    width: 408,
    zIndex: 10,

    '&$searchSidebarCollapsed': {
      minWidth: 64,
      width: 64,
    },
  },
}), {
  styleName: 'SearchSidebarStyles',
})(SearchSidebarPure);
