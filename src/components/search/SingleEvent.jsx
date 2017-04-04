'use strict';
import React from 'react';
import TLEventHeader from '../tl-event/TLEventHeader';
import TLEventBody from '../tl-event/TLEventBody';
import TLEventFooter from '../tl-event/TLEventFooter';


const SingleEvent = (props) => {
  const {
    evt, addEventToFavorites, getStarGlyphClass, hasMultipleTags, imageStore,
    evt: { name, uuid, description, location, date, photoCount, formattedDate, type }
  } = props;
  console.log('\nIMAGE STORE:', imageStore);

  return (
    <li className="evt-card">
      <TLEventHeader
        evtName={ name }
        evtUuid={ uuid }
        imageData={ imageStore } />
      <TLEventBody
        evtDescription={ description }
        evtLocation={ location }
        evtDate={ date }
        photoCount={ photoCount }
        evtFormattedDate={ formattedDate } />
      <TLEventFooter
        { ...props }
        evtType={ type }
        addEventToFavorites={ addEventToFavorites }
        getStarGlyphClass={ getStarGlyphClass }
        hasMultipleTags={ hasMultipleTags } />
    </li>
  );
};

export default SingleEvent;
