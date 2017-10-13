import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';
import GoogleMapsAPIStyles from '../constants/json/GoogleMapsAPIStyles.json';
import { aesthetic } from '../style/styler';

export default class GMap extends Component {
  static displayName = 'GoogleMap';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    lat: PropTypes.number,
    lng: PropTypes.number,
    theme: PropTypes.string,
  };

  static defaultProps = {
    lat: 45.5231,
    lng: -122.6765,
    theme: 'base',
  };

  constructor(props) {
    super(props);
    const { theme = 'base' } = props;

    this.GMap;

    this.theme = aesthetic.themes[theme];
    const { colors, fonts } = this.theme;

    this.boxStyles = {
      backgroundColor: colors.white.pure,
      border: '1px solid #999',
      fontFamily: fonts.face.roboto,
      left: '25%',
      lineHeight: '30px',
      padding: '5px 5px 5px 10px',
      position: 'absolute',
      textAlign: 'center',
      top: 10,
      zIndex: 5,
    };
  }

  componentDidMount() {
    const { lat, lng } = this.props;

    this.StyledGMap = new google.maps.StyledMapType(GoogleMapsAPIStyles, { name: 'Timeline' });
    this.GMap = new google.maps.Map(this.map, {
      center: { lat, lng },
      mapTypeControl: true,
      mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map'],
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      },
      scrollwheel: false,
      zoom: 8,
    });

    this.GMap.mapTypes.set('styled_map', this.StyledGMap);
    this.GMap.setMapTypeId('styled_map');
  }

  componentWillReceiveProps(nextProps) {
    this.GMap.panTo({ lat: nextProps.lat, lng: nextProps.lng });
  }

  shouldComponentUpdate = () => false;

  geocodeLocation(resultsMap = this.GMap) {
    const address = $('#address').val();
    const Geocoder = new google.maps.Geocoder();

    Geocoder.geocode({ address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK || status === 'OK') {
        const { location: { lat: newLat, lng: newLng }, viewport } = results[0].geometry;
        const geocodedLoc = { lat: newLat(), lng: newLng() };

        this.panTo(resultsMap, geocodedLoc);
        resultsMap.fitBounds(viewport);
      } else {
        throw new Error(`Attempt to geocode provided location failed: ${status}`);
      }
    });
  }

  newLatLng = ({ lat, lng }) => new google.maps.LatLng(lat, lng);

  panTo(map = this.GMap, { lat, lng }) {
    map.panTo({ lat, lng });
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <div
          ref={(map) => { this.map = map; }}
          className="gmap-wrapper"
        />
        <div
          id="floating-panel"
          style={{ ...this.boxStyles }}
        >
          <input
            id="address"
            type="textbox"
            defaultValue="Portland, OR"
          />
          <input
            id="geocode-input"
            type="button"
            value="Geocode"
            onClick={() => this.geocodeLocation(this.GMap)}
          />
        </div>
      </div>
    );
  }
}
