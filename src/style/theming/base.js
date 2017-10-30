import dedent from 'dedent';
import { isNil, isPlainObject, noop, pickBy } from 'lodash';
import SharedStylesGenerator from '../shared';

/* TRUE CONSTANTS */
export const PURE_WHITE = '#FFFFFF';
export const THEME_RED = '#B15B5B';

export const DEFAULT_FONTS = 'Helvetica, sans-serif';
export const HELVETICA_NEUE = `"Helvetica Neue", ${DEFAULT_FONTS}`;

export const BUTTON_TIMING_FUNCTION = 'cubic-bezier(0, 0.44, 0.94, 1.29)';

/* CSS KEYWORDS */
export const keywords = {
  all: 'all',
  auto: 'auto',
  buttonFace: 'buttonface',
  important: '!important',
  inherit: 'inherit',
  initial: 'initial',
  new: 'new',
  none: 'none',
  normal: 'normal',
  transparent: 'transparent',
  unset: 'unset',
};

/* THEME COLORS */
const colors = {
  black: {
    backgroundSemiOp: 'rgba(94, 94, 94, 0.55)',
    boxShadow: 'rgba(0, 0, 0, 0.175)',
    boxShadowStrong: '#474747',
    charcoal: '#625F5F',
    navReelBackground: 'rgba(0, 0, 0, 0.75)',
    primary: '#111111',
    pure: '#000000', // Black
  },
  blue: {
    hover: '#4689F8',
    link: '#5395AF',
    note: '#C4D8FB',
    primary: '#4285F4',
    pure: '#0000FF', // Blue
    show: '#5395AF',
  },
  green: {
    oxidized: '#5DB7B7',
  },
  grey: {
    appBackground: '#F6F8FB',
    backgroundLine: '#C3C3C3',
    backgroundSemiOp: 'rgba(212, 212, 212, 0.47)',
    border: '#CCCCCC',
    boxShadow: '#6C6C6C',
    buttonControl: '#8898A5',
    buttonFace: '#595959',
    dim: '#696969', // DimGrey
    granite: '#DDDDDD',
    line: '#EEEEEE',
    lite: '#BBBBBB',
    loblolly: '#B7B7B7',
    medium: '#999999',
    placeholder: '#AEAEAE',
    primary: '#737373',
    pure: '#808080', // Grey|Gray
    tuna: '#464A4C',
    unchecked: '#5A5A5A',
  },
  purple: {
    background: '#AB76C2',
    pure: '#800080', // Purple
  },
  red: {
    dark: '#7C3939',
    disabled: 'rgba(177, 91, 91, 0.50)',
    focus: '#AB5252',
    hover: '#B86969',
    noTransparent: '#CDABAC',
    oysterPink: '#E8CECE',
    primary: THEME_RED,
    pure: '#FF0000', // Red
    secondary: '#DA7A7A',
    semiTransparent: 'rgba(177, 91, 91, 0.30)',
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
    lilac: '#E8E8E8',
    lite: PURE_WHITE, // White
    offWhite: '#F1E5E6',
    primary: PURE_WHITE, // White
    pure: PURE_WHITE, // White
    semiTransparent: 'rgba(254, 254, 254, 0.60)',
    smoke: '#F5F5F5',
  },
  yellow: {
    warn: '#F6F6CF',
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
    roboto: `Roboto, Arial, ${DEFAULT_FONTS}`,
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
export const buttonRevealTransition = (transitionPropsOverride) => ({
  delay: null,
  duration: 250,
  property: keywords.all,
  timingFunction: BUTTON_TIMING_FUNCTION,
  ...(isPlainObject(transitionPropsOverride) ? transitionPropsOverride : null),
});

export const customTimingFunction = (transitionPropsOverride) => ({
  delay: 125,
  duration: 250,
  property: keywords.all,
  timingFunction: 'cubic-bezier(0, 0.25, 0.70, 0.40)',
  ...(isPlainObject(transitionPropsOverride) ? transitionPropsOverride : null),
});

export const hoverTransition = (transitionPropsOverride) => ({
  delay: 250,
  duration: 250,
  property: keywords.all,
  timingFunction: 'cubic-bezier(0, 0.25, 0.70, 0.40)',
  ...(isPlainObject(transitionPropsOverride) ? transitionPropsOverride : null),
});

export const transitionAll = (transitionPropsOverride) => ({
  delay: null,
  duration: 250,
  property: keywords.all,
  timingFunction: 'linear',
  ...(isPlainObject(transitionPropsOverride) ? transitionPropsOverride : null),
});

export const transitionVisibility = (transitionPropsOverride) => [{
  delay: null,
  duration: 250,
  property: 'opacity',
  timingFunction: 'ease-in-out',
  ...(isPlainObject(transitionPropsOverride) ? transitionPropsOverride : null),
}, {
  delay: null,
  duration: 250,
  property: 'visibility',
  timingFunction: 'ease-in-out',
  ...(isPlainObject(transitionPropsOverride) ? transitionPropsOverride : null),
}];

export const transitions = {
  buttonRevealTransition,
  customTimingFunction,
  hoverTransition,
  transitionAll,
  transitionVisibility,
};

/* IMAGE ASSETS */
const gradientParameters = dedent(`
  45deg,
  #CBCBCB 25%,
  transparent 25%,
  transparent 75%,
  #CBCBCB 75%,
  #CBCBCB
`);
export const checkeredTransparencyBckg = { /* eslint-disable no-dupe-keys,sort-keys */
  backgroundColor: colors.white.semiTransparent,
  backgroundImage: `-webkit-linear-gradient(${gradientParameters}), -webkit-linear-gradient(${gradientParameters})`,
  backgroundImage: `-moz-linear-gradient(${gradientParameters}), -moz-linear-gradient(${gradientParameters})`,
  backgroundImage: `-o-linear-gradient(${gradientParameters}), -o-linear-gradient(${gradientParameters})`,
  backgroundImage: `-ms-linear-gradient(${gradientParameters}), -ms-linear-gradient(${gradientParameters})`,
  backgroundImage: `linear-gradient(${gradientParameters}), linear-gradient(${gradientParameters})`,
  MozBackgroundSize: [20, 20],
  WebkitBackgroundSize: [20, 20],
  backgroundSize: [20, 20],
  backgroundPosition: '0 0, 10px 10px',
}; /* eslint-enable no-dupe-keys,sort-keys */

export const imageAssets = {
  checkeredTransparencyBckg,
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
  searchIcon: 'http://petersenhotels.com/2015/wp-content/themes/petersen-hotels/images/search.svg',
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

export const conditionalOverride = (overrideObj, predicate = noop, ...args) => !!predicate(overrideObj, ...args)
  ? overrideObj
  : null;

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

export const markObjectValuesImportant = (styleObject = {}) => Object
  .entries(styleObject)
  .map(([property, value]) => [property, `${value} ${keywords.important}`])
  .reduce((acc, [currProperty, currValue]) => ({ ...acc, [currProperty]: currValue }), {});

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
  conditionalOverride,
  disableSelection,
  enforceImportance,
  flexify,
  hide,
  hideOverflow,
  markObjectValuesImportant,
  setElementVisibility,
  styleInheritor,
  visible,
};

/* COMPILED BASE THEME */
export const baseTheme = {
  colors,
  fonts,
  helpers,
  imageAssets,
  keywords,
  transitions,
};

/* DEFAULT THEME EXPORT */
export default {
  colors,
  fonts,
  helpers,
  imageAssets,
  keywords,
  shared: SharedStylesGenerator(baseTheme),
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
