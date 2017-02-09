'use strict';
import React from 'react';


const TLEventFooter = ({ evtNote }) => (
  <div className="panel-footer">
    {[
      evtNote,
      <i
        key="StarGlyph"
        className="glyphicon glyphicon-star-empty" />
    ]}
  </div>
);

export default TLEventFooter;
