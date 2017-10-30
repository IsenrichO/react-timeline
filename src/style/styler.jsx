import { create } from 'jss';
import JSSAdapter from 'aesthetic-adapter-jss';
import DefaultPreset from 'jss-preset-default';
import Aesthetic, { createStyler } from 'aesthetic';

// Theming Styles:
import BaseTheme from './theming/base';

const defaultUnit = {
  '-moz-background-size': 'px',
  '-o-background-size': 'px',
  '-webkit-background-size': 'px',
  'animation-delay': 'ms',
  'animation-duration': 'ms',
  'background-size': '%',
  'border-radius': '%',
  'transition-delay': 'ms',
  'transition-duration': 'ms',
};

const { colors: baseThemeColors } = BaseTheme;
const globalStyles = {
  '@global': {
    '*::selection': {
      backgroundColor: baseThemeColors.red.primary,
      color: baseThemeColors.white.primary,
    },
    'a:focus, a:hover': {
      textDecoration: 'none',
    },

    // Remove scroll on the body when `react-modal` is open:
    '.ReactModal__Body--open': {
      overflow: 'hidden',
    },

    // React-Infinite-Calendar:
    '.Cal__Header__active': {
      height: '156px !important',
      textTransform: 'unset !important',
    },

    // React-Geosuggest Library Internal HTML Styles:
    '.geosuggest__input-wrapper': {
      borderRadius: 'inherit',
    },
    '.geosuggest__suggests-wrapper': {
      width: 'inherit',
    },
  },
};

const PresetOptions = {
  defaultUnit,
  global: globalStyles,
};
const jssInstance = create(DefaultPreset(PresetOptions));

/**
 * 1.) Compile styles and apply any plugins
 * 2.) Manually insert stylesheet into the DOM for client-side rendering
 */
const globalStyleSheet = jssInstance.createStyleSheet(globalStyles);
globalStyleSheet.attach();

const aestheticConfig = {
  extendable: false,
  pure: false,
  stylesPropName: 'classNames',
  themePropName: 'theme',
};

const aestheticInstance = new Aesthetic(
  new JSSAdapter(jssInstance),
  aestheticConfig,
);

// Register all separate Aesthetic theming profiles:
aestheticInstance.registerTheme('base', BaseTheme);

// Exports:
export { aestheticInstance as aesthetic };
export default createStyler(aestheticInstance);
