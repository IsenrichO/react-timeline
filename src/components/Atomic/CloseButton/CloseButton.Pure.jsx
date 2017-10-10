import React from 'react';
import PropTypes from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import { aesthetic } from '../../../style/styler';

const CloseButtonPure = ({
  backgroundColor,
  className,
  classNames,
  clickHandler,
  disabled,
  href,
  iconStyle,
  mini,
  style,
  theme,
}) => (
  <FloatingActionButton
    backgroundColor={backgroundColor}
    className={classes(
      className,
      !!disabled && classNames.disabledButton,
    )}
    disabled={disabled}
    href={href}
    mini={mini}
    onClick={clickHandler}
    style={style}
    zDepth={2}
  >
    <ClearIcon className={classNames.closeButtonIcon} />
  </FloatingActionButton>
);

CloseButtonPure.displayName = 'CloseButtonPure';

CloseButtonPure.propTypes = {
  backgroundColor: PropTypes.string,
  className: PropTypes.oneOfType([
    ClassNamesPropType,
    PropTypes.string,
  ]),
  classNames: ClassNamesPropType.isRequired,
  clickHandler: PropTypes.func,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  iconStyle: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  ),
  mini: PropTypes.bool,
  style: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  ),
  theme: PropTypes.string,
};

CloseButtonPure.defaultProps = {
  backgroundColor: aesthetic.themes.base.colors.red.primary,
  className: null,
  clickHandler: Function.prototype,
  disabled: false,
  href: null,
  iconStyle: null,
  mini: false,
  style: null,
  theme: 'base',
};

export default CloseButtonPure;
