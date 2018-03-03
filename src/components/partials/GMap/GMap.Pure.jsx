// @flow
import React, { Component }            from 'react';
import PropTypes                       from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';
import { isEmpty, isNil }              from 'lodash';
import MapMarkerIcon                   from '@root/assets/images/map-marker.svg';
import GoogleMapsAPIStyles             from '~/constants/json/GoogleMapsAPIStyles.json';
import { aesthetic }                   from '~/style/styler';

/* FLOW TYPINGS */
type Props = {
  lat?: number,
  lng?: number,
  location?: string,
  theme?: string,
  withFullSizeView?: boolean,
};

export default class GMapPure extends Component<Props> {
  static displayName = 'GoogleMapsComponent';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    lat: PropTypes.number,
    lng: PropTypes.number,
    location: PropTypes.string,
    markers: PropTypes.arrayOf(PropTypes.string),
    theme: PropTypes.string,
    withFullSizeView: PropTypes.bool,
  };

  static defaultProps = {
    lat: 45.5231,
    lng: -122.6765,
    location: null,
    markers: null,
    theme: 'base',
    withFullSizeView: false,
  };

  constructor(props) {
    super(props);
    const { theme = 'base' } = props;

    this.GMap;

    this.theme = aesthetic.themes[theme];
    const { colors, fonts } = this.theme;

    this.boxStyles = {
      backgroundColor: colors.white.pure,
      border: `1px solid ${colors.grey.medium}`,
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
    const { lat, lng, location, markers } = this.props;

    this.StyledGMap = new google.maps.StyledMapType(GoogleMapsAPIStyles, { name: 'Timeline' });
    this.GMap = new google.maps.Map(this.gmap, {
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

    // if (!isNil(markers)) this.setMapMarkers(markers);
    if (!isNil(markers)) this.renderMapMarkers(markers);

    google.maps.event.trigger(this.gmap, 'resize');

    if (!isEmpty(location)) return this.geocodeLocation(this.GMap, location);
  }

  componentWillReceiveProps({
    lat: nextLat,
    lng: nextLng,
    location: nextLocation,
  }) {
    return !isEmpty(nextLocation)
      ? this.geocodeLocation(this.GMap, nextLocation)
      : this.GMap.panTo({ lat: nextLat, lng: nextLng });
  }

  shouldComponentUpdate = () => false;

  geocodeLocation(resultsMap = this.GMap, location) {
    const address = !isEmpty(location)
      ? location
      : $('#address').val();
    const Geocoder = new google.maps.Geocoder();

    Geocoder.geocode({ address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK || status === 'OK') {
        const { location: { lat: newLat, lng: newLng }, viewport } = results[0].geometry;
        const geocodedLoc = { lat: newLat(), lng: newLng() };

        this.panTo(resultsMap, geocodedLoc);
        return resultsMap.fitBounds(viewport);
      }

      throw new Error(`Attempt to geocode provided location failed: ${status}`);
    });
  }

  newLatLng = ({ lat, lng }) => new google.maps.LatLng(lat(), lng());

  panTo = (map = this.GMap, { lat, lng }) => map.panTo({ lat, lng });

  createMarker(address, geocodedAddress) {
    const { lat, lng } = geocodedAddress;

    const newMarker = new google.maps.Marker({
      icon: MapMarkerIcon,
      map: this.GMap,
      position: this.newLatLng({ lat, lng }),
      title: address,
    });

    // google.maps.event.addListener(marker, 'click', function() {
    //   infowindow.setContent(contentString);
    //   infowindow.open(map, marker);
    // });

    // bounds.extend(marker.position);
  }

  geoCodeAddress(address) {
    const geoCoder = new google.maps.Geocoder();
    const { OK, OVER_QUERY_LIMIT } = google.maps.GeocoderStatus;

    geoCoder.geocode({ address }, (results, status) => {
      if (status === OK || status === 'OK') {
        const { location: geocodedAddress } = results[0].geometry;
        this.createMarker(address, geocodedAddress);
      } else if (status === OVER_QUERY_LIMIT) {
        throw new Error('WARNING: You have exceeded the geocoding query limit!');
      }
    });

    // geocoder.geocode({ address }, function(results, status) {
    //   if (status === google.maps.GeocoderStatus.OK) {
    //     var p = results[0].geometry.location;
    //     var lat = p.lat();
    //     var lng = p.lng();
    //     createMarker(address,lat, lng);
    //   } else {
    //     if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
    //       nextAddress--;
    //       delay++;
    //     } else { return null; }
    //   }
    //   next();
    // });
  }

  renderMapMarkers(markers) {
    return markers.forEach((marker, index) => {
      this.geoCodeAddress(marker);
    });
  }

  setMapMarkers(markers) {
    const GeoCoder = new google.maps.Geocoder();

    return markers.map((marker, index) => new google.maps.Marker({
      map: this.GMap,
      position: GeoCoder.geocode({ address: marker }),
      title: marker,
    }));
    // GeoCoder.geocode({ address }, (results, status) => {
    //   if (status === google.maps.GeocoderStatus.OK || status === 'OK') {
    //     const { location: { lat: newLat, lng: newLng }, viewport } = results[0].geometry;
    //     const geocodedLoc = { lat: newLat(), lng: newLng() };

    //     this.panTo(resultsMap, geocodedLoc);
    //     resultsMap.fitBounds(viewport);
    //   }

    //   throw new Error(`Attempt to geocode provided location failed: ${status}`);
    // });
  }

  render() {
    const { classNames, withFullSizeView } = this.props;

    return (
      <div
        className={classes(
          classNames.gmapContainer,
          !!withFullSizeView && classNames.fullSizeGmapContainer,
        )}
      >
        <div
          ref={(map) => { this.gmap = map; }}
          className={classNames.gmapWrapper}
        />
        <div
          id="floating-panel"
          style={{ ...this.boxStyles }}
        >
          <input
            defaultValue="Portland, OR"
            id="address"
            type="text"
          />
          <input
            id="geocode-input"
            onClick={() => this.geocodeLocation(this.GMap)}
            type="button"
            value="Geocode"
          />
        </div>
      </div>
    );
  }
}
