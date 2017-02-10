'use strict';
import React from 'react';


const TLEventFooter = ({ evtNote }) => (
  <div className="panel-footer">
    <div className="evt-tags">
      {[
        <i
          key={ `TagsGlyph` }
          className="glyphicon glyphicon-tags" />,
        evtNote
      ]}
    </div>
    <i className="glyphicon glyphicon-star-empty" />
  </div>
);

export default TLEventFooter;
