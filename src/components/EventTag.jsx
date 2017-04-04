'use strict';
import React, { Component } from 'react';


const EventTag = ({ tagTitle, index }) => (
  <div
    className="evt-tag"
    contentEditable={ false }>
    { tagTitle }
  </div>
);

export default EventTag;
