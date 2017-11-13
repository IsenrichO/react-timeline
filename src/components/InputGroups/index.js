import React from 'react';
import CalendarDateInput from './CalendarDateInput';
import DateInput from './DateInput';
import GeoSuggestInput from './GeoSuggestInput';
import TagsTypeAhead from './TagsTypeAheadInput';
import TextBasedInput from './TextBasedInput';
import TextBlockInput from './TextBlockInput';
import TitleBlockInput from './TitleBlockInput';

export const inputGroupMap = new Map([
  ['DATE_SINGLE', (props) => (<DateInput {...props} />)],
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
