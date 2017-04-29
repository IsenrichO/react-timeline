'use strict';
import React, { Component } from 'react';
import GoogleMapsAPIStyles from '../constants/json/GoogleMapsAPIStyles.json';


export default class GMap extends Component {
  constructor(props) {
    super(props);
    this.GMap;
    this.boxStyles = {
      position: 'absolute',
      top: '10px',
      left: '25%',
      padding: '5px 5px 5px 10px',
      border: '1px solid #999',
      textAlign: 'center',
      fontFamily: 'Roboto, sans-serif',
      lineHeight: '30px',
      backgroundColor: '#FFF',
      zIndex: 5
    };
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {
    this.GMap.panTo({ lat: nextProps.lat, lng: nextProps.lng });
  }

  componentDidMount() {
    this.StyledGMap = new google.maps.StyledMapType(GoogleMapsAPIStyles, { name: 'Timeline' });
    this.GMap = new google.maps.Map(this.map, {
      center: { lat: this.props.lat, lng: this.props.lng },
      zoom: 8,
      scrollwheel: false,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
      }
    });

    this.GMap.mapTypes.set('styled_map', this.StyledGMap);
    this.GMap.setMapTypeId('styled_map');
  }

  geocodeLocation(resultsMap = this.GMap) {
    const address = $('#address').val(),
          Geocoder = new google.maps.Geocoder();

    Geocoder.geocode({ address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK || status === 'OK') {
        const { location: { lat: newLat, lng: newLng }, viewport } = results[0].geometry,
              geocodedLoc = { lat: newLat(), lng: newLng() };
        this.panTo(resultsMap, geocodedLoc);
        resultsMap.fitBounds(viewport);
      } else {
        throw new Error(`Attempt to geocode provided location failed: ${status}`);
      }
    });
  }

  newLatLng({ lat, lng }) {
    return new google.maps.LatLng(lat, lng);
  }

  panTo(map = this.GMap, { lat, lng }) {
    map.panTo({ lat, lng });
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <div
          className="gmap-wrapper"
          ref={ (map) => { this.map = map; }} />
        <div
          id="floating-panel"
          style={{ ...this.boxStyles }}>
          <input
            id="address"
            type="textbox"
            defaultValue="Sydney, NSW" />
          <input
            id="geocode-input"
            type="button"
            value="Geocode"
            onClick={ () => this.geocodeLocation(this.GMap) } />
        </div>
      </div>
    );
  }
};
