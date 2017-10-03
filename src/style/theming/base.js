import dedent from 'dedent';
import { pickBy } from 'lodash';

export const PURE_WHITE = '#FFFFFF';
export const THEME_RED = '#B15B5B';

const colors = {
  black: {
    backgroundSemiOp: 'rgba(94, 94, 94, 0.65)',
    boxShadow: 'rgba(0, 0, 0, 0.175)',
    navReelBackground: 'rgba(0, 0, 0, 0.75)',
    primary: '#625F5F',
    pure: '#000000',
  },
  blue: {
    link: '#5395AF',
    note: '#C4D8FB',
    primary: '#4285F4',
    show: '#5395AF',
  },
  grey: {
    backgroundLine: '#C3C3C3',
    backgroundSemiOp: 'rgba(212, 212, 212, 0.47)',
    border: '#CCCCCC',
    buttonFace: '#595959',
    dim: '#696969', // DimGrey
    lite: '#BBBBBB',
    medium: '#999999',
    placeholder: '#AEAEAE',
    primary: '#737373',
  },
  purple: {
    background: '#AB76C2',
  },
  red: {
    disabled: 'rgba(177, 91, 91, 0.5)',
    focus: '#AB5252',
    noTransparent: '#CDABAC',
    oysterPink: '#E8CECE',
    primary: THEME_RED,
    semiTransparent: 'rgba(177, 91, 91, 0.3)',
  },
  status: {
    danger: '#C0182B',
  },
  teal: {
    primary: '#26A69A',
  },
  white: {
    background: '#F5F8FA',
    eggShell: '#F4F4F4',
    haze: '#F7F7F7',
    lite: PURE_WHITE,
    offWhite: '#F1E5E6',
    primary: PURE_WHITE,
  },
};

const fonts = {
  face: {
    default: '"Helvetica Neue", Helvetica, sans-serif',
    glyphicons: '"Glyphicons Halflings", sans-serif',
    neue: '"Helvetica Neue", Helvetica, sans-serif',
    raleway: 'Raleway, "Helvetica Neue", Helvetica, sans-serif',
    robot: 'Roboto, Arial, sans-serif',
    slant: 'oblique 1.2rem/1 Raleway, "Helvetica Neue", sans-serif',
  },
  size: {
    copy: 12,
    giant: 72,
    heading: 24,
    label: 10,
    large: 16,
    medium: 14,
    subHeading: 20,
    subTitle: 36,
    title: 48,
    tooltip: 8,
  },
};

export const transitionAll = {
  delay: null,
  duration: 250,
  property: 'all',
  timingFunction: 'linear',
};

export const transitions = {
  transitionAll,
};

const imageAssetUrls = {
  emptyContent: dedent(`
    data:image/svg+xml;utf8,\
    <svg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'>\
    <g fill='%23E8BAA5' fill-opacity='0.4' fill-rule='evenodd'><path d='M5 0h1L0 6V5zM6 5v1H5z'/>\
    </g></svg>\
  `),
  mainButtonPen: 'https://ssl.gstatic.com/s2/oz/images/quark/a7367650055ae3cf32ee3b7023c1ed88ic_create_wht_24dp.png',
};

export const flexify = (
  direction = 'row',
  justifyContent = 'space-around',
  [items = 'initial', content = 'initial', self = 'initial'] = Array(3).fill('initial'),
  [grow = 0, shrink = 1, basis = 'auto'] = [0, 1, 'auto'],
  wrap = 'nowrap',
  display = 'flex', // Included last b/c of the relative infrequency of using `inline-flex`
) => pickBy({
  align: { content, items, self },
  display,
  flex: { basis, flow: `${direction} ${wrap}`, grow, shrink },
  justifyContent,
}, Boolean);

export const hideOverflow = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

export const styleInheritor = (...propNames) => propNames.reduce((acc, curr) => ({
  ...acc,
  [curr]: 'inherit',
}), {});

export const setElementVisibility = (shouldHide = true) => ({
  opacity: ~~!shouldHide,
  visibility: ['visible', 'hidden'][+shouldHide],
});

export const hide = {
  opacity: 0,
  visibility: 'hidden',
};

export const visible = {
  opacity: 1,
  visibility: 'visible',
};

export const helpers = {
  flexify,
  hide,
  hideOverflow,
  setElementVisibility,
  styleInheritor,
  visible,
};

export const keywords = {
  auto: 'auto',
  buttonFace: 'buttonface',
  important: '!important',
  inherit: 'inherit',
  initial: 'initial',
  none: 'none',
  normal: 'normal',
  transparent: 'transparent',
};

export default {
  colors,
  fonts,
  helpers,
  imageAssetUrls,
  keywords,
  transitions,
};


// $slider-gradient-start: #9E5656;
// $slider-gradient-stop: $theme-red;
// $slider-active-gradient-start: #904444;
// $slider-active-gradient-stop: #9C5454;

// $cb-unchecked: #5A5A5A;

// $border-sides: top right bottom left;
// $transition-timing-func: .25s 0.125s cubic-bezier(0, 0.25, 0.7, 0.4);
// $transition-ease: 0.45s 0.125s ease-in-out;

// $show-more-link: #5395AF;


// $theme-fonts: 'Helvetica Neue', Arial, sans-serif;
