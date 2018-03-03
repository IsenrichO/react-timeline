import { capitalize } from 'lodash';
import ImageReelPure  from './ImageReel.Pure';
import styler         from '~/style/styler';

export const renderNavigationButton = (direction = 'right', colors, helpers, keywords, transitions) => {
  const formattedDir = capitalize(direction.toLowerCase());
  const [isNext, isPrev] = [formattedDir === 'Right', formattedDir === 'Left'];

  return {
    ...helpers.styleInheritor('height'),
    cursor: 'pointer',
    overflow: `hidden ${keywords.important}`,
    padding: `0 ${keywords.important}`,

    '&:hover': {
      '& $reelNavArrowIcon': {
        marginLeft: '10%',
        transition: helpers.condenseStyles(transitions.transitionAll(), true),
        transitionDuration: 100,
      },
    },

    '& $reelNavArrowIcon': {
      ...helpers.styleInheritor('lineHeight'),
      color: colors.white.primary,
      fontSize: '3rem !important', // Necessary Material-Icons library override
      height: '100%',
      marginLeft: `${(Math.sign([null, 'Left'].indexOf(formattedDir)) * (100 * (!!isNext ? 1.7 : 1)))}%`,
      position: 'static !important',
      transition: helpers.condenseStyles(transitions.transitionAll(), true), // `${transitions.transitionAll} ${keywords.important}`,
      transitionDelay: `100ms ${keywords.important}`,
      transitionDuration: `200ms ${keywords.important}`,
    },
  };
};

export default styler(({ colors, fonts, helpers, imageAssets, keywords, transitions }) => ({
  // Static declarations necessary for subsequent reference(s):
  navAlignLeft: {},
  navAlignRight: {},
  offsetWrapperWithEventCard: {},
  reelWithFallbackMessage: {},
  selectedBckg: {},
  withEventCard: {},

  imageReel: {
    ...helpers.flexify('row'),
    height: 'calc(10vw + 0.50rem - 1px)',
    lineHeight: 'calc(10vw + 0.50rem - 1px)',
    margin: [0, 0, '0.25rem', '0.50rem'],
    paddingTop: 0,
    transition: transitions.transitionAll(),

    '&$withEventCard': {
      borderLeft: {
        color: colors.red.primary,
        style: 'dashed',
        width: 'thin',
      },
    },
  },
  navArrowWrapper: {
    ...helpers.styleInheritor('height'),
    backgroundColor: colors.black.navReelBackground,
    overflow: 'hidden',
    position: 'absolute',
    transition: transitions.transitionAll(),
    width: '1.50rem',
    zIndex: 10,

    '&$navAlignLeft': { left: 0 },
    '&$navAlignRight': { right: 0 },
  },
  offsetWrapper: {
    ...helpers.flexify('row', 'space-evenly'),
    ...helpers.hideOverflow,
    ...helpers.styleInheritor('height'),
    position: 'relative',
    width: '100%',

    '&:hover': {
      '& $navArrowWrapper': {
        width: '2.80rem',
      },
    },

    '&$offsetWrapperWithEventCard': {
      marginLeft: '0.714286rem',
      width: 'calc(100% - 0.714286rem)',
    },
  },
  panLeft: {
    ...renderNavigationButton('left', colors, helpers, keywords, transitions),
  },
  panRight: {
    ...renderNavigationButton('right', colors, helpers, keywords, transitions),
  },
  reelContainer: {
    ...helpers.flexify(),
    ...helpers.styleInheritor('height', 'lineHeight'),
    position: 'relative',
    transition: transitions.transitionAll(),

    '&$reelWithFallbackMessage': {
      ...helpers.styleInheritor('width'),
      background: {
        attachment: null,
        color: keywords.transparent,
        image: `url("${imageAssets.emptyContent}")`,
        position: 'center',
        repeat: 'repeat',
        size: 'auto',
      },
      backgroundClip: 'content-box',
      height: '4em',

      '&:before': {
        ...helpers.flexify('row', 'center', ['center']),
        ...helpers.styleInheritor('height', 'width'),
        color: colors.grey.placeholder,
        content: '"No photos to display"',
        font: {
          family: fonts.face.raleway,
          size: fonts.size.subHeading,
          style: 'oblique',
        },
        position: 'relative',
      },
    },
  },
  reelNavArrowIcon: {
    color: `${colors.white.primary} ${keywords.important}`,
  },
}), {
  styleName: 'ImageReelStyles',
})(ImageReelPure);
