import dedent from 'dedent';
import { isNil, pickBy } from 'lodash';

/* TRUE CONSTANTS */
export const PURE_WHITE = '#FFFFFF';
export const THEME_RED = '#B15B5B';

export const DEFAULT_FONTS = 'Helvetica, sans-serif';
export const HELVETICA_NEUE = `"Helvetica Neue", ${DEFAULT_FONTS}`;

/* THEME COLORS */
const colors = {
  black: {
    backgroundSemiOp: 'rgba(94, 94, 94, 0.65)',
    boxShadow: 'rgba(0, 0, 0, 0.175)',
    charcoal: '#625F5F',
    navReelBackground: 'rgba(0, 0, 0, 0.75)',
    primary: '#111111',
    pure: '#000000', // Black
  },
  blue: {
    link: '#5395AF',
    note: '#C4D8FB',
    primary: '#4285F4',
    pure: '#0000FF', // Blue
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
    pure: '#808080', // Grey|Gray
    unchecked: '#5A5A5A',
  },
  purple: {
    background: '#AB76C2',
    pure: '#800080', // Purple
  },
  red: {
    disabled: 'rgba(177, 91, 91, 0.5)',
    focus: '#AB5252',
    noTransparent: '#CDABAC',
    oysterPink: '#E8CECE',
    primary: THEME_RED,
    pure: '#FF0000', // Red
    semiTransparent: 'rgba(177, 91, 91, 0.3)',
  },
  status: {
    danger: '#C0182B',
  },
  teal: {
    chartreuse: '#7FFF00', // Chartreuse
    primary: '#26A69A',
    pure: '#008080', // Teal
  },
  white: {
    background: '#F5F8FA',
    eggShell: '#F4F4F4',
    haze: '#F7F7F7',
    hue: '#B0A7A7',
    lite: PURE_WHITE, // White
    offWhite: '#F1E5E6',
    primary: PURE_WHITE, // White
    pure: PURE_WHITE, // White
  },
};

/* THEME FONT STYLES */
const fonts = {
  face: {
    arial: `Arial, ${DEFAULT_FONTS}`,
    default: DEFAULT_FONTS,
    glyphicons: `"Glyphicons Halflings", ${DEFAULT_FONTS}`,
    material: `"Material Icons", ${DEFAULT_FONTS}`,
    neue: HELVETICA_NEUE,
    raleway: `Raleway, ${HELVETICA_NEUE}`,
    robot: `Roboto, Arial, ${DEFAULT_FONTS}`,
    slant: `oblique 1.2rem/1 Raleway, ${HELVETICA_NEUE}`,
    vollkorn: `'Vollkorn', ${DEFAULT_FONTS}`,
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

/* TRANSITION STYLES */
export const customTimingFunction = {
  delay: 125,
  duration: 250,
  property: 'all',
  timingFunction: 'cubic-bezier(0, 0.25, 0.7, 0.4)',
};

export const hoverTransition = {
  delay: 250,
  duration: 250,
  property: 'all',
  timingFunction: 'cubic-bezier(0, 0.25, 0.70, 0.40)',
};

export const transitionAll = {
  delay: null,
  duration: 250,
  property: 'all',
  timingFunction: 'linear',
};

export const transitionVisibility = [{
  delay: null,
  duration: 250,
  property: 'opacity',
  timingFunction: 'ease-in-out',
}, {
  delay: null,
  duration: 250,
  property: 'visibility',
  timingFunction: 'ease-in-out',
}];

export const transitions = {
  customTimingFunction,
  hoverTransition,
  transitionAll,
  transitionVisibility,
};

/* CSS KEYWORDS */
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

/* IMAGE ASSETS */
const imageAssetUrls = {
  emptyContent: dedent(`
    data:image/svg+xml;utf8,\
    <svg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'>\
    <g fill='%23E8BAA5' fill-opacity='0.4' fill-rule='evenodd'><path d='M5 0h1L0 6V5zM6 5v1H5z'/>\
    </g></svg>\
  `),
  mainButtonPen: 'https://ssl.gstatic.com/s2/oz/images/quark/a7367650055ae3cf32ee3b7023c1ed88ic_create_wht_24dp.png',
  modalGradient(direction = 'top') {
    return dedent(`
      linear-gradient(
        to ${direction.toLowerCase()},
        ${colors.white.primary} 20%,
        rgba(255, 255, 255, 0.8) 70%,
        rgba(255, 255, 255, 0.08) 99%
      )
    `);
  },
};

/* UTILITY METHODS */
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

export const enforceImportance = (styleObject = {}) => {
  const importantDirective = keywords.important;
  const objectWithImportance = {};

  for (const key in styleObject) {
    const propertyVal = styleObject[key];

    objectWithImportance[key] = (typeof propertyVal === 'number')
      ? (key.toLowerCase().includes('duration') || key.toLowerCase().includes('delay'))
        ? `${propertyVal}ms ${importantDirective}`
        : `${propertyVal}px ${importantDirective}`
      : `${propertyVal} ${importantDirective}`;
  }

  return objectWithImportance;
};

export const condenseStyles = (styleObject = {}, withImportance = false, predefinedOrder) => {
  const stylePropValPairs = Object.entries(styleObject);

  const msUnitProperties = ['delay', 'duration'];
  const pxUnitProperties = ['aslk']; // ['size'];

  return stylePropValPairs
    .filter(([propertyName, propertyVal]) => !isNil(propertyVal))
    .map(([propertyName, propertyVal]) =>
      msUnitProperties.includes(propertyName.toLowerCase())
        ? `${propertyVal}ms` : pxUnitProperties.includes(propertyName.toLowerCase())
        ? `${propertyVal}px` : propertyVal,
    )
    .concat(!!withImportance ? keywords.important : '')
    .join(' ')
    .trim();
};

export const disableSelection = { /* eslint-disable indent,sort-keys */
  '-ms-pointer-events': 'visiblePainted',
      'pointer-events': 'visiblePainted',
  '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
     '-khtml-user-select': 'none',
       '-moz-user-select': 'none',
        '-ms-user-select': 'none',
         '-o-user-select': 'none',
            'user-select': 'none',
}; /* eslint-enable indent,sort-keys */

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
  condenseStyles,
  disableSelection,
  enforceImportance,
  flexify,
  hide,
  hideOverflow,
  setElementVisibility,
  styleInheritor,
  visible,
};

/* DEFAULT THEME EXPORT */
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
