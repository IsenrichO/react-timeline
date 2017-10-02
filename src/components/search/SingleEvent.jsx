import React from 'react';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';
import TLEventHeader from '../TLEvent/EventPanelHeader';
import TLEventBody from '../TLEvent/EventPanelBody';
import TLEventFooter from '../TLEvent/EventPanelFooter';

const SingleEventPure = ({
  addEventToFavorites,
  getStarGlyphClass,
  hasMultipleTags,
  imageStore,
  evt,
  evt: { name, uuid, description, location, date, photoCount, formattedDate, type },
}) => (
  <li className="evt-card">
    <TLEventHeader
      evtName={name}
      evtUuid={uuid}
      imageData={imageStore}
    />
    <TLEventBody
      evtDescription={description}
      evtLocation={location}
      evtDate={date}
      photoCount={photoCount}
      evtFormattedDate={formattedDate}
    />
    <TLEventFooter
      // {...props}
      evt={evt}
      evtType={type}
      addEventToFavorites={addEventToFavorites}
      getStarGlyphClass={getStarGlyphClass}
      hasMultipleTags={hasMultipleTags}
    />
  </li>
);

SingleEventPure.displayName = 'SingleEvent';

SingleEventPure.propTypes = {
  addEventToFavorites: PropTypes.func.isRequired,
  classNames: ClassNamesPropType.isRequired,
  hasMultipleTags: PropTypes.bool,
};

SingleEventPure.defaultProps = {
  hasMultipleTags: false,
};

export default SingleEventPure;
