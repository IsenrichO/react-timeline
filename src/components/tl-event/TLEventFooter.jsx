'use strict';
import React from 'react';


const TLEventFooter = ({ evt, evtType, addEventToFavorites, getStarGlyphClass, hasMultipleTags }) => (
  <div className="panel-footer">
    <div className="evt-tags">
      {[
        <i
          key={ `TagsGlyph` }
          className={ `glyphicon glyphicon-tag${hasMultipleTags ? 's' : ''}` } />,
        // <i className="material-icons">local_offer</i>,
        evtType
      ]}
    </div>
    <i
      className={ `glyphicon glyphicon-star${getStarGlyphClass ? '' : '-empty'}` }
      onClick={ () => addEventToFavorites(evt) } />
  </div>
);

export default TLEventFooter;


// <i className="material-icons">star</i>
// <i className="material-icons">star_half</i>
// <i className="material-icons">star_border</i>
