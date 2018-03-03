import BatchActionButtonsPure from './BatchActionButtons.Pure';
import styler from '~/style/styler';

export default styler(({ colors, fonts, helpers, keywords }) => ({
  // Static declarations necessary for subsequent reference(s):
  batchActionButtonActive: {},
  batchActionButtonIcon: {},

  batchActionButton: {
    ...helpers.setElementVisibility(),
    backgroundColor: colors.white.primary,
    border: `${keywords.none} ${keywords.important}`,
    borderRadius: 50,
    boxShadow: [{
      blur: 0,
      color: 'rgba(0, 0, 0, 0.10)',
      inset: 'inset',
      spread: 0,
      x: 1,
      y: 1,
    }, {
      blur: 0,
      color: 'rgba(0, 0, 0, 0.07)',
      inset: 'inset',
      spread: 0,
      x: 0,
      y: -1,
    }, {
      blur: 6,
      color: colors.grey.loblolly,
      inset: null,
      spread: 0.5,
      x: -1,
      y: 4,
    }],
    color: colors.red.primary,
    padding: `0 ${keywords.important}`,
    position: `fixed ${keywords.important}`,
    right: '4rem',

    '&$batchActionButtonActive': {
      ...helpers.setElementVisibility(false),
    },

    '&:first-child': {
      bottom: '10rem',
    },

    '&:last-child': {
      bottom: '14rem',
    },

    '&[disabled]': {
      backgroundColor: colors.white.lilac,
      color: colors.red.disabled,
      cursor: 'not-allowed',
    },

    '& $batchActionButtonIcon': {
      font: {
        family: fonts.face.material,
        lineHeight: `3.2142857142857144rem ${keywords.important}`,
        size: `1.75rem ${keywords.important}`,
        style: keywords.normal,
        weight: 400,
      },
    },
  },
}), {
  styleName: 'BatchActionButtonStyles',
})(BatchActionButtonsPure);

// .batch-action-btns {
//   position: fixed;
//   right: 5.5rem;
//   border-radius: 50%;
//   border: none;
//   background-color: $theme-content-lt;
//   box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1),
//               inset 0 -1px 0 rgba(0, 0, 0, 0.07),
//               -1px 4px 6px 0.5px #B7B7B7;
//   opacity: 0;
//   visibility: hidden;
  // ===============   animation: growBtn 0.5s 0.125s ease-in-out forwards;
  // color: $theme-red;
  // &:first-child { bottom: 10rem; }
  // &:last-child { bottom: 14rem; }
  // i {
  //   font: normal 400 1.75rem/3.2142857142857144rem 'Glyphicons Halflings', sans-serif;
  //   top: 0;
  //   color: inherit;
  // }
  // &[disabled] {
  //   color: $theme-red-disabled;
  //   background-color: #E8E8E8;
  //   cursor: not-allowed;
  // }
// }
