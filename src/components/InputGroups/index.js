import React from 'react';
import CalendarDateInput from './CalendarDateInput';
import TagsTypeAhead from './TagsTypeAheadInput';
import TextBasedInput from './TextBasedInput';
import TextBlockInput from './TextBlockInput';
import TitleBlockInput from './TitleBlockInput';
import GeoSuggestInput from './GeoSuggestInput';

export const inputGroupMap = new Map([
  ['DATE', (props) => (<CalendarDateInput {...props} />)],
  ['GEO', (props) => (<GeoSuggestInput {...props} />)],
  ['INPUT', (props) => (<TitleBlockInput {...props} />)],
  ['TAGS', (props) => (<TagsTypeAhead {...props} />)],
  ['TEXTAREA', (props) => (<TextBlockInput {...props} />)],
  ['TEXT-BASED', (props) => (<TextBasedInput {...props} />)],
  ['TITLE', (props) => (<TitleBlockInput {...props} />)],
]);

export default (inputType = 'INPUT') => inputGroupMap.has(inputType.toUpperCase())
  ? inputGroupMap.get(inputType.toUpperCase())
  : inputGroupMap.get('TEXT-BASED');
