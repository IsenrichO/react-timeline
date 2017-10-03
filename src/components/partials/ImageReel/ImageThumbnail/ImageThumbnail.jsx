import dedent from 'dedent';
import ImageThumbnailPure from './ImageThumbnail.Pure';
import styler from '../../../../style/styler';

export default styler(({ colors, fonts, helpers, keywords, transitions }) => ({
  bckgSelectOption: {},
  thumb: {
    background: {
      attachment: null,
      color: keywords.transparent,
      position: 'center',
      repeat: 'no-repeat',
      size: 'cover',
    },
    flexShrink: 0,
    height: 'calc(10vw - 6px)',
    overflow: 'hidden',
    position: 'relative',
    top: 3,
    width: 'calc(10vw - 10px)',
  },
  thumbWrapper: {
    backgroundColor: colors.white.haze,
    border: {
      color: colors.grey.lite,
      radius: 4,
      style: 'groove',
      width: 1,
    },
    height: 'inherit',
    margin: [0, '0.5vw'],
    padding: [2, 4],
    position: 'relative',
    transition: transitions.transitionAll,
    width: '10vw',

    '&:before': {
      ...helpers.hide,
      // background: -webkit-linear-gradient(to bottom, rgba(0, 0, 0, 0.69) 20%, rgba(0, 0, 0, 0.35) 65%, transparent 95%);
      // background:    -moz-linear-gradient(to bottom, rgba(0, 0, 0, 0.69) 20%, rgba(0, 0, 0, 0.35) 65%, transparent 95%);
      // background:      -o-linear-gradient(to bottom, rgba(0, 0, 0, 0.69) 20%, rgba(0, 0, 0, 0.35) 65%, transparent 95%);
      backgroundImage: dedent(`
        linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.69) 20%,
          rgba(0, 0, 0, 0.35) 65%,
          ${keywords.transparent} 95%
        )
      `),
      borderRadius: 3,
      content: '""',
      height: 0,
      left: 0,
      position: 'absolute',
      top: 0,
      transition: transitions.transitionAll,
      width: '100%',
      zIndex: 1,
    },

    [[
      '&:hover:before',
      '&:hover .glyphicon',
      '&:hover .material-icons',
    ].join(', ')]: {
      ...helpers.visible,
      height: '35%',
    },

    '&:hover .material-icons': {
      fontSize: '1.5rem',
      lineHeight: '1.35rem',
      opacity: 0.4,
      transition: {
        delay: null,
        duration: 250,
        property: 'opacity',
        timingFunction: 'ease',
      },

      '&:hover': {
        ...helpers.visible,
      },
    },

    '& .glyphicon, & .material-icons': {
      ...helpers.hide,
      color: colors.white.primary,
      cursor: 'pointer',
      font: {
        family: fonts.face.glyphicons,
        lineHeight: 1,
        size: '1.35rem',
        style: 'normal',
        weight: 'lighter',
      },
      position: 'absolute',
      right: '0.35rem',
      top: '0.35rem',
      zIndex: 1,
    },

    '& .material-icons': {
      left: '0.35rem',
      right: 'auto',

      '&$selectedBckg': {
        ...helpers.visible,
        opacity: `1 ${keywords.important}`,
      },
    },
  },
}), {
  styleName: 'ImageThumbnailStyles',
})(ImageThumbnailPure);
