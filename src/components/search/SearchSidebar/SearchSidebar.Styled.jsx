import SearchSidebarPure from './SearchSidebar.Pure';
import styler from '~/style/styler';

export default styler(({ colors, fonts, helpers, keywords, transitions }) => ({
  // Static declarations necessary for subsequent reference(s):
  activeFilterIndicator: {},
  searchCategoryAccordion: {},
  searchCategoryActive: {},
  searchCategoryCondensed: {},
  searchCategoryIconCondensed: {},
  searchCategoryTitle: {},
  searchCategoryTitleHidden: {},
  searchSidebarCollapsed: {},

  fixedPositioningContainer: {
    ...helpers.styleInheritor('height', 'width'),
    backgroundColor: colors.red.primary,
    boxShadow: {
      blur: 16,
      color: colors.black.drawerShadow,
      inset: null,
      spread: 4,
      x: -2,
      y: 0,
    },
    position: 'fixed',
  },
  homeIcon: {
    fontSize: fonts.size.subTitle,
  },
  homeSidebarButton: {
    font: {
      family: fonts.face.neue,
      lineHeight: 0.5,
      size: '4rem',
      style: keywords.normal,
      weight: 'lighter',
    },
    height: `64px ${keywords.important}`,
    position: `absolute ${keywords.important}`,
    right: 0,
    top: 0,
    width: `64px ${keywords.important}`,
  },
  searchCategory: {
    ...helpers.flexify('column', 'flex-start', ['center', 'center']),
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
      backgroundColor: colors.red.hover,
      zIndex: 0,
    },

    '&$searchCategoryActive': {
      backgroundColor: colors.red.hover,

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
        // color: `${colors.red.primary} ${keywords.important}`,
      },
    },

    '&$searchCategoryCondensed': {
      ...helpers.flexify('column', 'center', ['flex-start', 'center']),
      height: 64,
      transition: transitions.transitionAll(),

      '& $searchCategoryHeader': {
        maxWidth: 64,
        padding: 0,
        transition: transitions.transitionAll(),
        width: keywords.auto,
      },

      '& $searchCategoryTitle': {
        transition: transitions.transitionVisibility(),
      },

      '& $searchCategoryTitleHidden': {
        ...helpers.setElementVisibility(),
        height: 0,
        transition: transitions.transitionVisibility(),
        width: 0,
      },
    },
  },
  searchCategoryButtonTooltip: {
    // Hide the filter category tooltips for the toolbar in its expanded state:
    ...helpers.setElementVisibility(true),
    display: keywords.none,
    left: '100%',
    zIndex: 30,
  },
  searchCategoryButton: {
    padding: 0,
  },
  searchCategoryHeader: {
    ...helpers.flexify('row', 'flex-start', ['center', 'center']),
    color: colors.white.pure,
    font: {
      family: fonts.face.raleway,
      lineHeight: '50px',
      size: 22,
    },
    margin: 0,
    minWidth: 64,
    padding: ['0.5rem', '2rem', '0.5rem', '3rem'],
    position: 'relative',
    transition: transitions.transitionAll(),
    width: 408,

    '& $searchCategoryButton > div': {
      height: 64,
    },

    '& $activeFilterIndicator': {
      alignSelf: 'center',
      position: 'absolute',
      right: '2rem',
      top: '50%',
      transform: 'translateY(-50%)',
    },

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
  searchCategoryIcon: {
    color: `${colors.white.pure} ${keywords.important}`,
    fontSize: `2.571429rem ${keywords.important}`,
    marginRight: '3rem',

    '&$searchCategoryIconCondensed': {
      font: {
        lineHeight: `64px ${keywords.important}`,
        size: `3.5rem ${keywords.important}`,
      },
      height: 64,
      margin: keywords.auto,
      textAlign: 'center',
      width: 64,
    },
  },
  searchSidebar: {
    height: '100vh',
    minWidth: 408,
    position: 'relative',
    transition: transitions.transitionAll(),
    width: 408,
    zIndex: 10,

    '&$searchSidebarCollapsed': {
      minWidth: 64,
      width: 64,

      '& $homeSidebarButton': {
        margin: `0 ${keywords.important}`,
      },

      // Only reveal the tooltip for the toolbar in its condensed/snapped state:
      '& $searchCategoryButtonTooltip': {
        ...helpers.setElementVisibility(false),
        display: 'block',
      },
    },
  },
  sidebarHomeIconTooltip: {
    left: '100%',
    zIndex: 30,
  },
}), {
  styleName: 'SearchSidebarStyles',
})(SearchSidebarPure);
