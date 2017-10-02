import TLEventPure from './TLEvent.Pure';
import styler from '../../style/styler';

export default styler(({ colors, keywords }) => ({
  tlEvent: {
    clear: 'both',
    float: 'left',
    marginBottom: '10vh',
    maxHeight: 1000,
    position: 'relative',
    transition: {
      delay: null,
      duration: 1000,
      property: 'all',
      timingFunction: 'ease',
    },
    width: '50%',
  },
  inverted: {
    float: 'right',
  },
  invertedMarker: {},
  invertedPanel: {},
  tlEventPanel: {
    backgroundColor: colors.white.primary,
    boxShadow: {
      blur: 15,
      color: 'rgba(0, 0, 0, 0.35)',
      inset: null,
      spread: 2,
      x: 1,
      y: 2,
    },
    opacity: 0,
    outline: {
      color: keywords.transparent,
      style: 'solid',
      width: 0,
    },
    position: 'relative',
    right: 'calc(-15% + 5rem)',
    transform: 'translateX(-100px)',
    transition: [{
      delay: null,
      duration: 500,
      property: 'outline',
      timingFunction: 'ease-in-out',
    }, {
      delay: null,
      duration: 750,
      property: 'transform',
      timingFunction: 'linear',
    }],
    visibility: 'hidden',
    width: '85%',

    // '&:before': {
    //   borderBottom: `calc(1.5rem + 2px) solid ${keywords.transparent}`,
    //   borderLeft: `calc(1.5rem + 2px) solid ${colors.grey.border}`,
    //   borderRight: `0 solid ${colors.grey.border}`,
    //   content: '""',
    //   left: '100%',
    //   position: 'absolute',
    //   top: -1,
    // },
    // '&:after': {
    //   borderBottom: `1.5rem solid ${keywords.transparent}`,
    //   borderLeft: `1.5rem solid ${colors.white.primary}`,
    //   borderRight: `0 solid ${colors.white.primary}`,
    //   content: '""',
    //   left: '100%',
    //   position: 'absolute',
    //   top: 0,
    // },
    '&:hover': {
      '& .tlToolbar': {
        opacity: '1 !important',
        visibility: 'visible !important',
      },

      '& .tl-evt-hover-state': {
        opacity: 1,
        visibility: 'visible',
      },
    },

    '&$invertedPanel': {
      left: '5rem',

      '&:before': {
        borderBottom: `calc(1.5rem + 2px) solid ${keywords.transparent}`,
        borderLeft: `0 solid ${colors.grey.border}`,
        borderRight: `calc(1.5rem + 2px) solid ${colors.grey.border}`,
        left: 'auto',
        right: '100%',
      },

      '&:after': {
        borderBottom: `1.5rem solid ${keywords.transparent}`,
        borderLeft: `0 solid ${colors.white.primary}`,
        borderRight: `1.5rem solid ${colors.white.primary}`,
        left: 'auto',
        right: '100%',
      },
    },
  },
  inView: {
    opacity: 1,
    transform: 'translateX(0) !important',
    visibility: 'visible',
  },
  tlMarker: {
    height: 32,
    position: 'absolute',
    right: -16,
    textAlign: 'center',
    top: -16,
    width: 32,

    '&$invertedMarker': {
      left: -16,
    },
  },
  tlMarkerIcon: {
    backgroundColor: colors.white.background,
    border: {
      color: colors.white.background,
      radius: '50%',
      style: 'solid',
      width: 2,
    },
    boxShadow: {
      blur: 8,
      color: colors.black.backgroundSemiOp,
      inset: null,
      spread: null,
      x: 0,
      y: 0,
    },
    font: {
      family: '"Material Icons", sans-serif',
      lineHeight: 1,
      size: '2rem',
      stretch: 'normal',
      style: 'normal',
      variant: 'normal',
      weight: 'bold',
    },

    '&:before, &:after': {
      backgroundColor: colors.white.primary,
      bottom: 'calc(100% - 1px)',
      content: '""',
      height: 8,
      left: '50%',
      position: 'absolute',
      transform: 'translateX(-50%)',
      width: 5.5,
    },

    '&:after': {
      top: 'calc(100% - 1px)',
    },
  },
}), {
  styleName: 'TimelineEventStyles',
})(TLEventPure);




// @include cbTransform(translateX(-100px));
// @include cbBoxShadow(0 1px 6px rgba(0, 0, 0, 0.175));
// @extend %hidden;
// position: relative;
// width: 85%;
// left: calc(7.5% - 20px);
// // width: 70%;
// // left: calc(22.5% - 20px);
// border: 1px solid $theme-border;
// transition: outline 0.5s ease-in-out,
//             transform 0.75s linear;
// outline: 0 solid $theme-transparent;
// background-color: $theme-content-lt;
// &:before { @extend %tt-right-shadow; }
// &:after { @extend %tt-right; }
// &:hover {
//   .tl-toolbar,
//   .collapse-up { @extend %visible; }
// }

// > li {
//   position: relative;
//   width: 50%;
//   max-height: 1000px;
//   margin-bottom: 2.5rem;
//   float: left;
//   clear: both;
//   transition: all 1s ease;
//   &.tl-event-invert {
//     width: 50%;
//     left: 0;
//     float: right;
//     .tl-marker { left: -1rem; }
//     .tl-toolbar { left: calc(100% + 1.6rem); }
//     .tl-event-panel {
//       @include cbTransform(translateX(100px));
//       left: 20px;
//       margin-right: 7.5%;
//       float: right;
//       &:before { @extend %tt-left-shadow; }
//       &:after { @extend %tt-left; }
//     }
//   }
// }

// @include cbTransform(translateX(0) !important);
// @extend %visible;
