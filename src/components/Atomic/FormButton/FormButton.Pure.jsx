import React from 'react';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';

const FormButtonPure = ({
  buttonText,
  classNames,
  clickHandler,
  isDisabled,
  name,
  type,
}) => (
  <button
    className={classNames.formButton}
    disabled={isDisabled}
    name={name}
    onClick={clickHandler}
    type={type}
  >
    {buttonText}
  </button>
);

FormButtonPure.displayName = 'FormButton';

FormButtonPure.propTypes = {
  buttonText: PropTypes.string,
  classNames: ClassNamesPropType.isRequired,
  clickHandler: PropTypes.func,
  isDisabled: PropTypes.bool,
  name: PropTypes.string,
  type: PropTypes.oneOf([
    'button',
    'submit',
  ]),
};

FormButtonPure.defaultProps = {
  buttonText: 'Submit',
  clickHandler: Function.prototype,
  isDisabled: false,
  name: 'formButton',
  type: 'button',
};

export default FormButtonPure;
