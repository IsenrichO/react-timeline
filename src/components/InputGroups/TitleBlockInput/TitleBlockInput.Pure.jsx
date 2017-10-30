import React from 'react';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';
import TextBasedInput from '../TextBasedInput';

const TitleBlockInputPure = ({
  classNames,
  error,
  id,
  input,
  isRequired,
  theme = 'base',
  touched,
}) => (
  <TextBasedInput
    error={error}
    icon="title"
    id={id}
    inputProps={{
      ...input,
      placeholder: 'West Coast roadtrip',
      title: `Give this event a title${!!isRequired ? ' (REQUIRED)' : ''}`,
      type: 'text',
    }}
    isRequired={isRequired}
    tagName="INPUT"
    touched={touched}
  />
);

TitleBlockInputPure.displayName = 'TitleBlockInput';

TitleBlockInputPure.propTypes = {
  classNames: ClassNamesPropType.isRequired,
  error: PropTypes.bool,
  id: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
  }).isRequired,
  isRequired: PropTypes.bool,
  theme: PropTypes.string,
  touched: PropTypes.bool,
};

TitleBlockInputPure.defaultProps = {
  error: false,
  id: null,
  isRequired: true,
  theme: 'base',
  touched: false,
};

export default TitleBlockInputPure;
