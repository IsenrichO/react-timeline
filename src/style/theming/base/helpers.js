import { isArray, isNil, isNumber, noop, pickBy } from 'lodash';
import keywords from './keywords';

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
  if (isArray(styleObject)) {
    return styleObject
      .map((style) => isNumber(style) ? `${style}px` : style)
      .concat(!!withImportance ? keywords.important : '')
      .join(' ')
      .trim();
  }

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

export const multiPropertyStyle = (value, [...properties]) => properties
  .reduce((acc, curr) => ({
    ...acc,
    [curr]: value,
  }), {});

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

/* COMPILED DEFAULT EXPORT */
export default {
  condenseStyles,
  conditionalOverride,
  disableSelection,
  enforceImportance,
  flexify,
  hide,
  hideOverflow,
  markObjectValuesImportant,
  multiPropertyStyle,
  setElementVisibility,
  styleInheritor,
  visible,
};
