import isPlainObject from 'lodash/isPlainObject';
import keywords from './keywords';

/* TRUE CONSTANTS */
export const BUTTON_TIMING_FUNCTION = 'cubic-bezier(0, 0.44, 0.94, 1.29)';

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

/* COMPILED DEFAULT EXPORT */
export default {
  buttonRevealTransition,
  customTimingFunction,
  hoverTransition,
  transitionAll,
  transitionVisibility,
};
