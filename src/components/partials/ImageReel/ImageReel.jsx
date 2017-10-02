import { capitalize } from 'lodash';
import dedent from 'dedent';
import ImageReelPure from './ImageReel.Pure';
import { hexToRgba } from '../../../utilities/utility_classes/general';
import styler from '../../../style/styler';

const renderNavigationButton = (direction = 'right', colors, helpers, transitions) => {
  const formattedDirName = capitalize(direction.toLowerCase());
  const [isNext, isPrev] = [formattedDirName === 'Right', formattedDirName === 'Left'];

  return {
    // background: {
    //   attachment: null,
    //   color: colors.white.primary,
    //   image: dedent(`
    //     radial-gradient(
    //       ellipse farthest-corner at 20px 55px,
    //       #B7BABE 0,
    //       ${hexToRgba(colors.white.primary, 0.01)} 40%,
    //       ${hexToRgba(colors.white.primary, 0.28)} 75%,
    //       ${hexToRgba(colors.white.primary, 0.55)} 99%
    //     )
    //   `),
    //   position: [`${75 - (100 * !!['Left'].includes(formattedDirName))}%`, 0],
    //   repeat: 'no-repeat',
    //   size: ['200%', '220%'],
    // },
    // border: {
    //   color: colors.grey.primary,
    //   radius: [
    //     isPrev ? 10 : 0,
    //     isNext ? 10 : 0,
    //     isNext ? 10 : 0,
    //     isPrev ? 10 : 0,
    //   ],
    //   style: 'double',
    //   width: 3,
    // },
    ...helpers.styleInheritor('height', 'width'),
    backgroundColor: colors.black.navReelBackground,
    cursor: 'pointer',
    overflow: 'hidden',
    position: 'absolute',
    // transition: transitions.transitionAll,

    '&:hover': {
      // background: {
      //   attachment: null,
      //   color: colors.white.primary,
      //   image: dedent(`
      //     radial-gradient(
      //       ellipse farthest-corner at 20px 55px,
      //       #B7BABE 0,
      //       ${hexToRgba(colors.white.primary, 0.01)} 40%,
      //       ${hexToRgba(colors.white.primary, 0.28)} 75%,
      //       ${hexToRgba(colors.white.primary, 0.55)} 99%
      //     )
      //   `),
      //   position: Array(2).fill('0'),
      //   repeat: 'no-repeat',
      //   size: ['230%', '200%'],
      // },
      // transition: transitions.transitionAll,

      '& > .material-icons': {
        marginLeft: '10%',
        transition: transitions.transitionAll,
        transitionDuration: 100,
      },
    },

    '& > .material-icons': {
      ...helpers.styleInheritor('lineHeight'),
      color: colors.white.primary,
      fontSize: '3rem !important', // Necessary Material-Icons library override
      height: '100%',
      marginLeft: `${Math.sign([null, 'Left'].indexOf(formattedDirName)) * 100}%`,
      position: 'static !important',
      transition: transitions.transitionAll,
      transitionDuration: 100,
    },
  };
};

export default styler(({ colors, fonts, helpers, imageAssetUrls, keywords, transitions }) => ({
  // Static declarations necessary for subsequent reference(s):
  navAlignLeft: {},
  navAlignRight: {},
  reelWithFallbackMessage: {},
  selectedBckg: {},

  imageReel: {
    ...helpers.flexify('row'),
    borderLeft: {
      color: colors.red.primary,
      style: 'dashed',
      width: 'thin',
    },
    height: 'calc(10vw + 0.5rem - 1px)',
    lineHeight: 'calc(10vw + 0.5rem - 1px)',
    margin: ['0.5rem', 0, '0.25rem', '0.5rem'],
    paddingTop: 0,
    transition: transitions.transitionAll,
  },
  navArrowWrapper: {
    ...helpers.styleInheritor('height'),
    overflow: 'hidden',
    position: 'absolute',
    transition: transitions.transitionAll,
    width: '2rem',
    zIndex: 10,

    '&$navAlignLeft': { left: 0 },
    '&$navAlignRight': { right: 0 },
  },
  offsetWrapper: {
    ...helpers.flexify('row', 'space-evenly'),
    ...helpers.hideOverflow,
    ...helpers.styleInheritor('height'),
    marginLeft: '0.714286rem',
    position: 'relative',
    width: 'calc(100% - 0.714286rem)',

    '&:hover': {
      '& $navArrowWrapper': {
        width: '3.5rem',
      },
    },
  },
  panLeft: {
    ...renderNavigationButton('left', colors, helpers, transitions),
  },
  panRight: {
    ...renderNavigationButton('right', colors, helpers, transitions),
  },
  reelContainer: {
    ...helpers.flexify(),
    ...helpers.styleInheritor('height', 'lineHeight'),
    position: 'relative',
    transition: transitions.transitionAll,

    '&$reelWithFallbackMessage': {
      ...helpers.styleInheritor('width'),
      background: {
        attachment: null,
        color: keywords.transparent,
        image: `url("${imageAssetUrls.emptyContent}")`,
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
  // thumb: {
  //   background: {
  //     attachment: null,
  //     color: keywords.transparent,
  //     position: 'center',
  //     repeat: 'no-repeat',
  //     size: 'cover',
  //   },
  //   flexShrink: 0,
  //   height: 'calc(10vw - 6px)',
  //   overflow: 'hidden',
  //   position: 'relative',
  //   top: 3,
  //   width: 'calc(10vw - 10px)',
  // },

  //   '&:before': {
  //   //   background: -webkit-linear-gradient(to bottom, rgba(0, 0, 0, 0.69) 20%, rgba(0, 0, 0, 0.35) 65%, transparent 95%);
  //   //   background:    -moz-linear-gradient(to bottom, rgba(0, 0, 0, 0.69) 20%, rgba(0, 0, 0, 0.35) 65%, transparent 95%);
  //   //   background:      -o-linear-gradient(to bottom, rgba(0, 0, 0, 0.69) 20%, rgba(0, 0, 0, 0.35) 65%, transparent 95%);
  //     backgroundImage: 'linear-gradient('
  //       + 'to bottom, '
  //       + 'rgba(0, 0, 0, 0.69) 20%, '
  //       + 'rgba(0, 0, 0, 0.35) 65%, '
  //       + `${keywords.transparent} 95%`
  //       + ')',
  //     borderRadius: [6, 6, 0, 0],
  //     content: '""',
  //     height: '35%',
  //     left: 0,
  //     top: 0,
  //     position: 'absolute',
  //     width: '100%',
  //     zIndex: 1,
  //   },

  //   [[
  //     '&:hover:before',
  //     '&:hover .glyphicon',
  //     '&:hover .material-icons',
  //   ].join(', ')]: helpers.visible,

  //   '&:hover .material-icons': {
  //     fontSize: '1.5rem',
  //     lineHeight: '1.35rem',
  //     opacity: 0.4,
  //     transition: {
  //       delay: null,
  //       duration: 250,
  //       property: 'opacity',
  //       timingFunction: 'ease',
  //     },

  //     '&:hover': {
  //       ...helpers.visible,
  //     },
  //   },

  //   '.glyphicon, .material-icons': {
  //     ...helpers.hide,
  //     color: colors.white.primary,
  //     cursor: 'pointer',
  //     font: {
  //       family: '"Glyphicons Halflings", sans-serif',
  //       lineHeight: 1,
  //       size: '1.35rem',
  //       style: 'normal',
  //       weight: 'lighter',
  //     },
  //     position: 'absolute',
  //     right: '0.35rem',
  //     top: '0.35rem',
  //     zIndex: 1,
  //   },

  //   '.material-icons': {
  //     left: '0.35rem',
  //     right: 'auto',

  //     '&$selectedBckg': {
  //       ...helpers.visible,
  //       opacity: `1 ${keywords.important}`,
  //     },
  //   },
  // },
}), {
  styleName: 'ImageReelStyles',
})(ImageReelPure);
