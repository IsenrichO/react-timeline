'use strict';
import React from 'react';
import TLEventHeader from '../tl-event/TLEventHeader';
import TLEventBody from '../tl-event/TLEventBody';
import TLEventFooter from '../tl-event/TLEventFooter';


const SingleEvent = (props) => {
  const { name, uuid, description, location, date, photoCount, formattedDate, type } = props;
  return (
    <li className="evt-card">
      <TLEventHeader
        evtName={ name }
        evtUuid={ uuid } />
      <TLEventBody
        evtDescription={ description }
        evtLocation={ location }
        evtDate={ date }
        photoCount={ photoCount }
        evtFormattedDate={ formattedDate } />
      <TLEventFooter
        { ...props }
        evtNote={ type }
        // addEventToFavorites={ addEventToFavorites }
        // getStarGlyphClass={ getStarGlyphClass }
        // hasMultipleTags={ hasMultipleTags }
        />
    </li>
  );
};

export default SingleEvent;
