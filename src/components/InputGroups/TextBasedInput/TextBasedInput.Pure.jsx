// @flow
import React, { createElement, isValidElement } from 'react';
import PropTypes                                from 'prop-types';
import { classes, ClassNamesPropType }          from 'aesthetic';
import isString                                 from 'lodash/isString';
import FontIcon                                 from 'material-ui/Icon';
import { aesthetic }                            from '~/style/styler';

type Props = {
  error?: boolean,
  icon?: string,
  id?: string,
  isRequired?: boolean,
  theme?: string,
  touched?: boolean,
};

const TextBasedInputPure = ({
  children,
  classNames,
  error,
  icon,
  id,
  inputProps,
  isRequired,
  tagName,
  theme,
  touched,
}: Props) => (
  <div
    className={classes(
      classNames.inputGroup,
      !!isRequired && classNames.requiredField,
    )}
  >
    <span className={classNames.inputGroupAddon}>
      <FontIcon
        className={classes(
          'material-icons',
          classNames[`${icon}BlockInputIcon`],
        )}
        color={aesthetic.themes[theme].colors.red.primary}
      >
        {icon}
      </FontIcon>
    </span>
    <label
      className={classNames.inputGroupLabel}
      htmlFor={id}
    >
      Label
    </label>
    {isValidElement(tagName) ? tagName : createElement(
      isString(tagName) ? tagName.toLowerCase() : 'input',
      { ...inputProps, className: classNames.formInput },
      children,
    )}
    <span className={classNames.validationMessage}>{touched ? error : ''}</span>
  </div>
);

TextBasedInputPure.displayName = 'TextBasedInputField';

TextBasedInputPure.propTypes = {
  children: PropTypes.node,
  classNames: ClassNamesPropType.isRequired,
  error: PropTypes.bool,
  icon: PropTypes.string,
  id: PropTypes.string,
  inputProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  isRequired: PropTypes.bool,
  tagName: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  theme: PropTypes.string,
  touched: PropTypes.bool,
};

TextBasedInputPure.defaultProps = {
  children: null,
  error: false,
  icon: 'title',
  id: null,
  inputProps: {},
  isRequired: false,
  tagName: 'INPUT',
  theme: 'base',
  touched: false,
};

export default TextBasedInputPure;
