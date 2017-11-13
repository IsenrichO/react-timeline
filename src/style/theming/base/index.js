import SharedStylesGenerator from '../../shared';

// Base theme imports:
import colors from './colors';
import constants from './constants';
import fonts from './fonts';
import helpers from './helpers';
import imageAssets from './imageAssets';
import keywords from './keywords';
import transitions from './transitions';

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
  constants,
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

// $transition-timing-func: .25s 0.125s cubic-bezier(0, 0.25, 0.7, 0.4);
// $transition-ease: 0.45s 0.125s ease-in-out;
