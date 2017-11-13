// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';
import update from 'immutability-helper';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import CalendarDateInput from '../CalendarDateInput';
import TextBasedInput from '../TextBasedInput';
import { parseAndFormatIsoDateTime } from '../../../util/DateTime';
import { aesthetic } from '../../../style/styler';

type Props = {
  error?: boolean,
  id?: string,
  isRequired?: boolean,
  theme?: string,
  touched?: boolean,
};

export default class DateInputPure extends Component<Props> {
  static displayName = 'DateInputField';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    error: PropTypes.bool,
    id: PropTypes.string,
    input: PropTypes.shape({
      name: PropTypes.string.isRequired,
      onBlur: PropTypes.func.isRequired,
      value: PropTypes.arrayOf(PropTypes.string).string,
    }).isRequired,
    isRequired: PropTypes.bool,
    theme: PropTypes.string,
    touched: PropTypes.bool,
  };

  static defaultProps = {
    error: false,
    id: null,
    isRequired: false,
    theme: 'base',
    touched: false,
  };

  constructor(props) {
    super(props);
    const { theme } = props;

    this.state = {
      isOpen: false,
    };

    this.handleInputBlur = ::this.handleInputBlur;
    this.handleInputFocus = ::this.handleInputFocus;
    this.handleRequestClose = ::this.handleRequestClose;
    this.theme = aesthetic.themes[theme];
  }

  handleInputBlur(dateTime) {
    const { onBlur: blurHandler } = this.props.input;
    console.log({ blurHandler });
  }

  handleInputFocus(evt) {
    return this.setState(update(this.state, {
      isOpen: { $set: true },
    }));
  }

  handleRequestClose(evt) {
    return this.setState(update(this.state, {
      isOpen: { $set: false },
    }));
  }

  render() {
    const { classNames, id, input, isRequired, touched } = this.props;
    const { isOpen } = this.state;
    const { keywords } = this.theme;

    console.log('INPUT DATE:', input.value);
    console.log('PARSED DATE:', parseAndFormatIsoDateTime(input.value));

    const modalActions = [
      <RaisedButton
        primary
        label="Cancel"
        onClick={this.handleRequestClose}
      />,
      <RaisedButton
        primary
        keyboardFocused
        label="Confirm"
        onClick={this.handleRequestClose}
      />,
    ];

    return (
      <div>
        <TextBasedInput
          icon="today"
          inputProps={{
            ...input,
            id,
            name: 'editEventDescriptionField',
            onBlur: this.handleInputBlur,
            onFocus: this.handleInputFocus,
            placeholder: 'Event date',
            title: `Provide details for this event${!!isRequired ? ' (REQUIRED)' : ''}`,
            type: 'text',
            value: parseAndFormatIsoDateTime(input.value),
          }}
          isRequired={isRequired}
          tagName="INPUT"
          touched={touched}
        />
        <Dialog
          autoDetectWindowHeight
          autoScrollBodyContent
          repositionOnUpdate
          actions={modalActions}
          actionsContainerClassName={classNames.dateInputModalActionsContainer}
          bodyClassName={classNames.dateInputModalBodyContainer}
          contentClassName={classNames.dateInputModalContentContainer}
          onRequestClose={this.handleRequestClose}
          open={isOpen}
          overlayClassName={classNames.dateInputModalOverlayContainer}
          paperClassName={classNames.dateInputModalPaperContainer}
          title="Event Date"
          titleClassName={classNames.dateInputModalTitle}
        >
          <CalendarDateInput {...this.props} />
        </Dialog>
      </div>
    );
  }
}
