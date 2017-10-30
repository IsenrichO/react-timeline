import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';
import GeoSuggest from 'react-geosuggest';
import update from 'immutability-helper';
import { get } from 'lodash';
import MapMarkerPlaceIcon from 'material-ui/svg-icons/maps/place';
import TextBasedInput from '../TextBasedInput';

export default class GeoSuggestInputPure extends Component {
  static displayName = 'GeoSuggestInput';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    geoLocation: PropTypes.string,
    init: PropTypes.string,
    input: PropTypes.shape({
      name: PropTypes.string.isRequired,
      onBlur: PropTypes.func,
      onFocus: PropTypes.func,
      value: PropTypes.string,
    }).isRequired,
    isDisabled: PropTypes.bool,
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    geoLocation: null,
    init: '',
    isDisabled: false,
    placeholder: 'Portland, OR',
  };

  constructor(props) {
    super(props);
    const { value: initialGeoValue = '' } = this.props.input;

    this.state = {
      hasFocus: false,
      initialGeoValue,
    };

    this.clearExistingInput = ::this.clearExistingInput;
    this.handleBlur = ::this.handleBlur;
    this.handleFocus = ::this.handleFocus;
    this.renderSuggestItem = ::this.renderSuggestItem;
    this.restoreInitialGeoValue = ::this.restoreInitialGeoValue;
  }

  clearExistingInput() {
    return this.geoSuggestEl.clear();
  }

  restoreInitialGeoValue() {
    const {
      init,
      input: { value: currentGeoValue = '' },
    } = this.props;

    return currentGeoValue && (currentGeoValue.length >= 3)
      ? this.geoSuggestEl.update(String(init))
      : null;
  }

  handleBlur(evt) {
    const { onBlur = Function.prototype } = this.props.input;

    return this.setState(update(this.state, {
      hasFocus: { $set: false },
    }), () => {
      onBlur(evt);
      // return this.restoreInitialGeoValue();
    });
  }

  handleFocus(evt) {
    const { onFocus = Function.prototype } = this.props.input;

    // Clear the existing input field first:
    this.clearExistingInput();

    return this.setState(update(this.state, {
      hasFocus: { $set: true },
    }), () => onFocus(evt));
  }

  renderSuggestItem({ label: suggestionLabel = '' }) {
    const { classNames } = this.props;

    return (
      <div className={classNames.geoSuggestItemContainer}>
        <MapMarkerPlaceIcon className={classNames.geoSuggestItemMapMarkerIcon} />
        <span className={classNames.geoSuggestItemLabel}>{suggestionLabel}</span>
      </div>
    );
  }

  render() {
    const { classNames, input, isDisabled, placeholder } = this.props;
    const { hasFocus } = this.state;

    return (
      <TextBasedInput
        icon="pin_drop"
        inputProps={{}}
        tagName={
          <GeoSuggest
            {...input}
            ref={(geoSuggestEl) => { this.geoSuggestEl = geoSuggestEl; }}
            autoActivateFirstSuggest
            highlightMatch
            autoComplete="on"
            className={classes(
              classNames.geoSuggestInputContainer,
              !!hasFocus && classNames.geoSuggestInputContainerWithFocus,
            )}
            disabled={isDisabled}
            googleMaps={google.maps}
            ignoreTab={false}
            initialValue={get(input, 'value', '')}
            inputClassName={classNames.geoSuggestInput}
            inputMode="latin"
            maxFixtures={5}
            minLength={3}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            placeholder={placeholder}
            queryDelay={225}
            renderSuggestItem={this.renderSuggestItem}
            suggestsClassName={classNames.geoSuggests}
            suggestsHiddenClassName={classNames.geoSuggestItemHidden}
            suggestItemClassName={classNames.geoSuggestItem}
            suggestItemActiveClassName={classNames.geoSuggestItemActive}
          />
        }
      />
    );
  }
}
