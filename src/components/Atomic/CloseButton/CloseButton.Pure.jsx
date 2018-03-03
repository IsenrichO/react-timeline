// @flow
import React                           from 'react';
import PropTypes                       from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';
import FloatingActionButton            from 'material-ui/Button';
import ClearIcon                       from 'material-ui-icons/Clear';
import { aesthetic }                   from '~/style/styler';
import { stylePropTypes }              from '~/util/TypeChecking';

type Props = {
  backgroundColor?: string,
  href?: string,
  isDisabled?: boolean,
  mini?: boolean,
  theme?: string,
};

const CloseButtonPure = ({
  backgroundColor,
  className,
  classNames,
  clickHandler,
  href,
  iconStyle,
  isDisabled,
  mini,
  style,
  theme,
  ...rest
}: Props) => (
  <FloatingActionButton
    fab
    backgroundColor={backgroundColor}
    className={classes(
      className,
      !!isDisabled && classNames.disabledButton,
    )}
    color="primary"
    disabled={!!isDisabled}
    href={href}
    mini={mini}
    onClick={clickHandler}
    style={style}
    zDepth={2}
    {...rest}
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
  href: PropTypes.string,
  iconStyle: stylePropTypes,
  isDisabled: PropTypes.bool,
  mini: PropTypes.bool,
  style: stylePropTypes,
  theme: PropTypes.string,
};

CloseButtonPure.defaultProps = {
  backgroundColor: aesthetic.themes.base.colors.red.primary,
  className: null,
  clickHandler: Function.prototype,
  href: null,
  iconStyle: null,
  isDisabled: false,
  mini: false,
  style: null,
  theme: 'base',
};

export default CloseButtonPure;
