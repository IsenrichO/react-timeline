'use strict';
import React, { Component } from 'react';
import GoogleMapsAPIStyles from '../constants/json/GoogleMapsAPIStyles.json';


export default class GMap extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {
    this.GMap.panTo({ lat: nextProps.lat, lng: nextProps.lng });
  }

  componentDidMount() {
    this.StyledGMap = new google.maps.StyledMapType(GoogleMapsAPIStyles, { name: 'React-Timeline' });

    this.GMap = new google.maps.Map(this.map, {
      center: { lat: this.props.lat, lng: this.props.lng },
      zoom: 8,
      scrollwheel: false,
      mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
      }
    });

    this.GMap.mapTypes.set('styled_map', this.StyledGMap);
    this.GMap.setMapTypeId('styled_map');
  }

  render() {
    return (
      <div
        className="gmap-wrapper"
        ref={ (map) => { this.map = map; }} />
    );
  }
};
