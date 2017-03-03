'use strict';
import React from 'react';


const TLEventFooter = ({ evt, evtType, addEventToFavorites, getStarGlyphClass, hasMultipleTags }) => (
  <div className="panel-footer">
    <div className="evt-tags">
      {[
        <i
          key={ `TagsGlyph` }
          className={ `glyphicon glyphicon-tag${hasMultipleTags ? 's' : ''}` } />,
        evtType
      ]}
    </div>
    <i
      className={ `glyphicon glyphicon-star${getStarGlyphClass ? '' : '-empty'}` }
      onClick={ () => addEventToFavorites(evt) } />
  </div>
);

export default TLEventFooter;
