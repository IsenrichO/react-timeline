// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';
import GeoSuggest from 'react-geosuggest';
import update from 'immutability-helper';
import { get, isEmpty } from 'lodash';
import MapMarkerPlaceIcon from 'material-ui/svg-icons/maps/place';
import ErrorOutlineIcon from 'material-ui/svg-icons/alert/error-outline';
import TextBasedInput from '../TextBasedInput';

type Props = {
  geoLocation?: string,
  init?: string,
  isDisabled?: boolean,
  isRequired?: boolean,
  placeholder?: string,
};

export default class GeoSuggestInputPure extends Component<Props> {
  static displayName = 'GeoSuggestInput';

  static propTypes = {
    changeHandler: PropTypes.func.isRequired,
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
    isRequired: PropTypes.bool,
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    geoLocation: null,
    init: '',
    isDisabled: false,
    isRequired: false,
    placeholder: 'Portland, OR',
  };

  static getGeoCodePart = (geoCode = {}, type = 'country') => {
    const GEOCODE_TYPES = [
      'administrative_area_level_1',
      'administrative_area_level_2',
      'country',
      'locality',
      'neighborhood',
      'political',
      'postal_code',
      'route',
      'street_number',
      'sublocality',
      'sublocality_level_1',
      'sublocality_level_2',
    ];

    if (!GEOCODE_TYPES.includes(type.toLowerCase())) throw new Error(`Unrecognized geocode type '${type}'`);

    return geoCode.find(({ types = [] }) => types.includes(type.toLowerCase()));
  };

  constructor(props) {
    super(props);
    const { value: initialGeoValue = '' } = this.props.input;

    this.state = {
      geoLabel: initialGeoValue,
      hasFocus: false,
      initialGeoValue,
    };

    this.clearExistingInput = ::this.clearExistingInput;
    this.forceInputBlur = ::this.forceInputBlur;
    this.handleBlur = ::this.handleBlur;
    this.handleEmptyResponse = ::this.handleEmptyResponse;
    this.handleFocus = ::this.handleFocus;
    this.handleSelection = ::this.handleSelection;
    this.renderSuggestItem = ::this.renderSuggestItem;
    this.restoreInitialGeoValue = ::this.restoreInitialGeoValue;
  }

  clearExistingInput() {
    return this.geoSuggestEl.clear();
  }

  forceInputBlur() {
    return this.geoSuggestEl.blur();
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

  handleEmptyResponse(userInput) {
    const { classNames } = this.props;

    return (
      <div className={classNames.geoSuggestEmptyResponseContainer}>
        <ErrorOutlineIcon className={classNames.geoSuggestEmptyResponseIcon} />
        <span className={classNames.geoSuggestEmptyResponseLabel}>
          {`Looks like no places were found for '${userInput}'`}
        </span>
      </div>
    );
  }

  handleSelection({
    description = '',
    gmaps,
    isFixture = false,
    label = '',
    location = {},
    matchedSubstrings = {},
    placeId = '',
  }) {
    const { changeHandler } = this.props;

    // Manually blur the input field as workaround to bug in `react-geosuggest`:
    if (isEmpty(gmaps)) return this.forceInputBlur();

    const {
      address_components: geoCode = {},
      formatted_address: formattedAddress,
    } = gmaps;
    const countryLabelPart = GeoSuggestInputPure.getGeoCodePart(geoCode, 'country').long_name;

    const formattedLabel = [
      GeoSuggestInputPure.getGeoCodePart(geoCode, 'locality').long_name,
      GeoSuggestInputPure.getGeoCodePart(geoCode, 'administrative_area_level_1').short_name,
      (countryLabelPart !== 'United States') && countryLabelPart,
    ]
      .filter(Boolean)
      .join(', ');

    const labelToSave = (/\d/g).test(formattedAddress) || !!GeoSuggestInputPure(geoCode, 'route')
      ? formattedAddress
      : formattedLabel;

    this.setState(update(this.state, {
      geoLabel: { $set: labelToSave },
    }), () => {
      this.forceInputBlur();
      return changeHandler('location', labelToSave);
    });
  }

  renderSuggestItem({
    description = '',
    isFixture = false,
    label: suggestionLabel = '',
    matchedSubstrings = {},
    placeId = '',
  }) {
    const { classNames } = this.props;

    return (
      <div className={classNames.geoSuggestItemContainer}>
        <MapMarkerPlaceIcon className={classNames.geoSuggestItemMapMarkerIcon} />
        <span className={classNames.geoSuggestItemLabel}>{suggestionLabel}</span>
      </div>
    );
  }

  render() {
    const { classNames, input, isDisabled, isRequired, placeholder } = this.props;
    const { hasFocus } = this.state;

    return (
      <TextBasedInput
        icon="pin_drop"
        inputProps={{}}
        tagName={
          <GeoSuggest
            {...input}
            ref={(geoSuggestEl) => { this.geoSuggestEl = geoSuggestEl; }}
            aria-atomic
            autoActivateFirstSuggest
            aria-haspopup
            highlightMatch
            aria-expanded
            autocapitalize
            autoComplete="on"
            aria-autocomplete="list"
            aria-controls="ReactGeoSuggestInputField"
            aria-disabled={!!isDisabled}
            aria-label="Select A Place"
            aria-orientation="vertical"
            aria-readonly={false}
            aria-roledescription="Dynamic list of places suggested by the Google Places API"
            className={classes(
              classNames.geoSuggestInputContainer,
              !!hasFocus && classNames.geoSuggestInputContainerWithFocus,
            )}
            disabled={!!isDisabled}
            googleMaps={google.maps}
            id="ReactGeoSuggestInputField"
            ignoreTab={false}
            initialValue={get(input, 'value', '')}
            inputClassName={classNames.geoSuggestInput}
            inputMode="latin"
            // label="Places"
            maxFixtures={5}
            minLength={3}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onSuggestNoResults={this.handleEmptyResponse}
            onSuggestSelect={this.handleSelection}
            placeholder={placeholder}
            queryDelay={225}
            renderSuggestItem={this.renderSuggestItem}
            required={!!isRequired}
            role="combobox"
            // skipSuggest={this.handleSkipSuggestion}
            suggestsClassName={classNames.geoSuggests}
            suggestsHiddenClassName={classNames.geoSuggestItemHidden}
            suggestItemClassName={classNames.geoSuggestItem}
            suggestItemActiveClassName={classNames.geoSuggestItemActive}
            title="Designate a place to associate with this event"
            // types={['establishment', 'geocode', '(regions)', '(cities)']}
          />
        }
      />
    );
  }
}
