import dedent from 'dedent';
import ImageThumbnailPure from './ImageThumbnail.Pure';
import styler from '../../../../style/styler';

export default styler(({ colors, fonts, helpers, keywords, transitions }) => ({
  // Static declarations necessary for subsequent reference(s):
  bckgSelectOption: {},
  removeThumbButton: {},
  selectedThumb: {},
  thumbnailActionIcon: {},
  thumbnailActionsBar: {},
  thumbnailTooltip: {},

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
    height: '99%',
    margin: [0, '0.5vw'],
    padding: [2, 4],
    position: 'relative',
    transition: transitions.transitionAll,
    width: '10vw',

    '& $thumbnailActionsBar': {
      ...helpers.flexify('row', 'space-between', ['center', 'center']),
      ...helpers.hide,
      ...helpers.hideOverflow,
      height: '1.5rem',
      left: 7,
      position: 'absolute',
      top: 5,
      transition: transitions.transitionVisibility,
      width: 'calc(100% - 1rem)',
      zIndex: 1,

      '& $thumbnailActionIcon': {
        color: colors.white.primary,
        cursor: 'pointer',
        font: {
          family: fonts.face.material,
          lineHeight: 1,
          size: '1.35rem',
          style: 'normal',
          weight: 'lighter',
        },
        height: `1.6rem ${keywords.important}`,
        padding: `0 ${keywords.important}`,
        width: `1.6rem ${keywords.important}`,
      },
    },

    '&:before': {
      ...helpers.hide,
      backgroundImage: dedent(`
        linear-gradient(\
          to bottom, \
          rgba(0, 0, 0, 0.69) 20%, \
          rgba(0, 0, 0, 0.35) 65%, \
          ${keywords.transparent} 95%\
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
      '&:hover $thumbnailActionsBar',
    ].join(', ')]: {
      ...helpers.visible,
      height: '35%',
    },

    '&:hover $thumbnailActionsBar': {
      height: '2rem',

      '& $thumbnailActionIcon': {
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
          opacity: 1.0,
        },
      },
    },

    '& .material-icons': {
      '&$selectedThumb': {
        ...helpers.visible,
        opacity: `1 ${keywords.important}`,
      },
    },
  },
}), {
  styleName: 'ImageThumbnailStyles',
})(ImageThumbnailPure);
