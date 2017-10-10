import ButtonControlsPure from './ButtonControls.Pure';
import styler from '../../../style/styler';

export default styler(({ colors, fonts, helpers }) => ({
  childBtnControl: {
    // transition: {
    //   delay:
    // }
  },
  mainBtnControls: {
    ...helpers.flexify('row', 'center'),
    backgroundColor: colors.red.primary,
    border: 'none',
    borderRadius: '50%',
    bottom: '3rem',
    color: colors.white.primary,
    fontSize: '5rem',
    height: '5rem',
    margin: 0,
    padding: 0,
    position: 'fixed',
    right: '3rem',
    top: 'auto !important',
    width: '5rem',
    zIndex: 10,
  },
  mainBtnIcon: {
    color: colors.white.primary,
    fontSize: '50%',
  },
}))(ButtonControlsPure);

// > i {
//   display: block;
//   left: 2px;
//   top: -1px;
//   font-size: 2.5rem;
//   height: 100%;
//   line-height: 5rem;
// }
// &-child {
//   @include nthChildIterator(transition-delay, 4, 0.05);
//   @include flex(flex, row, center, center);
//   position: fixed;
//   border: none;
//   border-radius: 50%;
//   background-color: $theme-content-lt;
//   box-shadow: 0 0 12px 1px rgba(0, 0, 0, 0.2);
//   color: #8898A5;
//   transition: all 0.25s cubic-bezier(0, 0.44, 0.94, 1.29);
//   .glyphicon { font-size: 1.5rem; }
//   &:hover {
//     background: #F5F5F5;
//     box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.26);
//   }
//   i {
//     font-size: 1.5rem;
//     line-height: 1;
//   }
// }
