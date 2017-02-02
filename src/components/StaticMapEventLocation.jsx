'use strict';
import React from 'react';


  // &zoom=12
  // &format=png
  // &maptype=roadmap

  // &style=feature:transit%7Ccolor:0xB15B5B%7Cvisibility:off\
  // &style=feature:transit%7Celement:geometry.fill%7Cvisibility:off\
  // &style=feature:transit%7Celement:geometry.stroke%7Cvisibility:off\
  // &style=feature:transit.line%7Celement:geometry.fill%7Ccolor:0x4ecc63%7Cvisibility:off\
  // &style=feature:transit.line%7Celement:geometry.stroke%7Cvisibility:off\
  // &style=feature:transit.station.rail%7Celement:geometry.fill%7Ccolor:0x4ecc63%7Cvisibility:on\
  // &style=feature:transit.station.rail%7Celement:geometry.stroke%7Ccolor:0x4ecc63%7Cvisibility:on

const MapStyle = `\
  &style=feature:administrative%7Celement:geometry%7Cvisibility:on\
  &style=feature:administrative%7Celement:labels%7Ccolor:0xB15B5B%7Cweight:0.5\
  &style=feature:administrative%7Celement:labels.text.fill%7Ccolor:0x8D4A4B%7Cweight:4\
  &style=feature:administrative.country%7Celement:geometry.stroke%7Ccolor:0x6473B7%7Cvisibility:simplified%7Cweight:6\
  &style=feature:administrative.land_parcel%7Celement:labels%7Cvisibility:off\
  &style=feature:administrative.locality%7Celement:labels%7Cvisibility:off\
  &style=feature:administrative.locality%7Celement:labels.text.stroke%7Cvisibility:on%7Cweight:1.5\
  &style=feature:administrative.neighborhood%7Celement:labels%7Cvisibility:off\
  &style=feature:landscape%7Celement:geometry.fill%7Ccolor:0xB15B5B%7Clightness:45\
  &style=feature:landscape.natural.landcover%7Celement:geometry.stroke%7Cvisibility:simplified\
  &style=feature:landscape.natural.terrain%7Cvisibility:off\
  &style=feature:poi%7Cvisibility:off\
  &style=feature:road.arterial%7Ccolor:0xD2D0D4%7Cvisibility:simplified\
  &style=feature:road.highway%7Ccolor:0xD7D5D8%7Cvisibility:off\
  &style=feature:road.highway%7Celement:labels.icon%7Cvisibility:off\
  &style=feature:road.highway.controlled_access%7Cvisibility:off\
  &style=feature:road.local%7Cvisibility:off\
  &style=feature:water%7Celement:geometry%7Ccolor:0x989D9B%7Cvisibility:simplified\
  &style=feature:transit%7Ccolor:0xD2D0D4%7Cvisibility:off`;

const StaticGMap = ({ evtLocation }) => {
  const key='AIzaSyCPV-2q_c8mzFWeY6e70DvHqLP8Zvt7h1U';
        // center='San Francisco';
  const Base = `https://maps.googleapis.com/maps/api/staticmap?center=${evtLocation}&size=400x200${MapStyle}&key=${key}`;
  
  return (
    <div className="static-map-wrapper">
      <img
        src={ Base }
        alt={ `Google Static Map for ${evtLocation}.` } />
    </div>
  );
};

export default StaticGMap;
