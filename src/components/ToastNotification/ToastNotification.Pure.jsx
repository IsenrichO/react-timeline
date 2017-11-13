// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';
import { isNil } from 'lodash';
import update from 'immutability-helper';
import Snackbar from 'material-ui/Snackbar';
import { stylePropTypes } from '../../util/TypeChecking';
import { checkForValidEnum } from '../../util/logging';

type Props = {
  actionLabel?: string,
  messageLabel?: string,
  withUndo?: boolean,
};

export default class ToastNotificationPure extends Component<Props> {
  static displayName = 'ToastNotification';

  static propTypes = {
    actionLabel: PropTypes.string,
    classNames: ClassNamesPropType.isRequired,
    handleAction: PropTypes.func,
    messageLabel: PropTypes.string,
    style: stylePropTypes,
    withUndo: PropTypes.bool,
  };

  static defaultProps = {
    actionLabel: null,
    handleAction() {},
    messageLabel: '',
    style: null,
    withUndo: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.handleEnableToast = ::this.handleEnableToast;
  }

  setNotificationStatus(isOpen) {
    return this.setState(update(this.state, isNil(isOpen)
      ? { $toggle: ['isOpen'] }
      : { isOpen: { $set: !!isOpen } },
    ));
  }

  handleEnableToast(evt) {
    return this.setNotificationStatus(true);
  }

  handleRequestClose(reason) {
    checkForValidEnum(['clickaway', 'timeout'], reason, `Invalid reason '${reason}' provided!`);
    return this.setNotificationStatus(false);
  }

  render() {
    const { actionLabel, classNames, handleAction, messageLabel, withUndo } = this.props;
    const { isOpen } = this.state;

    return (
      <Snackbar
        action={(
          <span className={classNames.toastNotificationActionLabel}>
            {isNil(actionLabel)
              ? (!!withUndo ? 'Undo' : 'Close')
              : actionLabel
            }
          </span>
        )}
        autoHideDuration={4000}
        className={classNames.toastNotificationRootContainer}
        message={(
          <span className={classNames.toastNotificationMessage}>
            {messageLabel}
          </span>
        )}
        onActionTouchTap={handleAction}
        onRequestClose={this.handleRequestClose}
        open={isOpen}
      />
    );
  }
}
