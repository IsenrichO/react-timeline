'use strict';
import React, { Component } from 'react';


export default class GMap extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {
    this.Gmap.panTo({ lat: nextProps.lat, lng: nextProps.lng });
  }

  componentDidMount() {
    this.Gmap = new google.maps.Map(this.map, {
      center: { lat: this.props.lat, lng: this.props.lng },
      zoom: 8
    });
  }

  render() {
    return (
      <div
        className="gmap-wrapper"
        ref={ (map) => { this.map = map; }}>

      </div>
    );
  }
};
