'use strict';
import React from 'react';


const TLEventFooter = ({ evt, evtNote, addEventToFavorites, getStarGlyphClass, hasMultipleTags }) => (
  <div className="panel-footer">
    <div className="evt-tags">
      {[
        <i
          key={ `TagsGlyph` }
          className={ `glyphicon glyphicon-tag${hasMultipleTags ? 's' : ''}` } />,
        evtNote
      ]}
    </div>
    <i
      className={ `glyphicon glyphicon-star${getStarGlyphClass ? '' : '-empty'}` }
      onClick={ () => addEventToFavorites(evt) } />
  </div>
);

export default TLEventFooter;
