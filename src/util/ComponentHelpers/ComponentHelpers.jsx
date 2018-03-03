import { camelCase, compact, concat, flow, join, map, trim, upperFirst, words } from 'lodash';

export const keyFormatter = (identifyingProp = '', keyPrefix = 'key') => flow([
  trim,
  (trimmedString = '') => words(trimmedString, /[^-_\s]+/gi),
  (splitWords = []) => concat([keyPrefix], splitWords),
  compact,
  (splitWords = []) => map(splitWords, (word, index, allWords) => !!index
    ? upperFirst(word)
    : camelCase(word),
  ),
  (mappedWords = []) => join(mappedWords, ''),
])(identifyingProp);

/* COMPILED DEFAULT EXPORT */
export default {
  keyFormatter,
};
