// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';
import TextBasedInput from '../TextBasedInput';

type Props = {
  error?: boolean,
  id?: string,
  isRequired?: boolean,
  theme?: string,
  touched?: boolean,
};

const TextBlockInputPure = ({
  classNames,
  error,
  id,
  input,
  isRequired,
  theme = 'base',
  touched,
}: Props) => (
  <TextBasedInput
    icon="subject"
    inputProps={{
      ...input,
      id,
      name: 'editEventDescriptionField',
      placeholder: 'Event description',
      rows: 6,
      title: `Provide details for this event${!!isRequired ? ' (REQUIRED)' : ''}`,
      type: 'text',
    }}
    tagName="TEXTAREA"
  />
);

TextBlockInputPure.displayName = 'TextBlockInputField';

TextBlockInputPure.propTypes = {
  classNames: ClassNamesPropType.isRequired,
  error: PropTypes.bool,
  id: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.arrayOf(PropTypes.string).string,
  }).isRequired,
  isRequired: PropTypes.bool,
  theme: PropTypes.string,
  touched: PropTypes.bool,
};

TextBlockInputPure.defaultProps = {
  error: false,
  id: null,
  isRequired: false,
  theme: 'base',
  touched: false,
};

export default TextBlockInputPure;
