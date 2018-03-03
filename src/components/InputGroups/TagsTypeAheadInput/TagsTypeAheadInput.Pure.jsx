// @flow
import React, { Component }   from 'react';
import PropTypes              from 'prop-types';
import { connect }            from 'react-redux';
import { ClassNamesPropType } from 'aesthetic';
import { isEmpty }            from 'lodash';
import ChipInput              from 'material-ui-chip-input';

type Props = {
  id: string,
  theme?: string,
};

@connect(
  ({ tags }) => ({ tags }),
)
export default class TagsTypeAheadInputPure extends Component<Props> {
  static displayName = 'TagsTypeAheadInput';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    error: PropTypes.node,
    id: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    label: PropTypes.node,
    tags: PropTypes.array.isRequired,
    theme: PropTypes.string,
  };

  static defaultProps = {
    error: null,
    isDisabled: false,
    label: 'Tags',
    theme: 'base',
  };

  render() {
    const {
      classNames,
      error,
      id,
      isDisabled,
      label,
      tags,
    } = this.props;

    return (
      <ChipInput
        clearOnBlur
        fullWidth
        fullWidthInput
        openOnFocus
        dataSource={!isEmpty(tags) && Array.from(tags[0])}
        disabled={isDisabled}
        errorText={(
          <span className={classNames.tagsChipInputError}>
            {error}
          </span>
        )}
        floatingLabelText={(
          <span className={classNames.tagsChipInputLabel}>
            {label}
          </span>
        )}
        id={id}
        hintText={(
          <span className={classNames.tagsChipInputHint}>
            Mark this event with tags of your choosing
          </span>
        )}
      />
    );
  }
}
