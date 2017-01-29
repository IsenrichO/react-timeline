'use strict';
import React, { Component } from 'react';




const StaticGMap = ({ evtLocation }) => {
  const key='AIzaSyCPV-2q_c8mzFWeY6e70DvHqLP8Zvt7h1U';
        // center='San Francisco';
  const Base = `https://maps.googleapis.com/maps/api/staticmap?center=${evtLocation}&size=400x200&key=${key}`;
  
  return (
    <div className="static-map-wrapper">
      <img
        src={ Base }
        alt={ `Google Static Map for ${evtLocation}.` } />
    </div>
  );
};

export default StaticGMap;
