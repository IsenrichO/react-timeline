// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';
import TLEventHeader from '../TLEvent/EventPanelHeader';
import TLEventBody from '../TLEvent/EventPanelBody';
import TLEventFooter from '../TLEvent/EventPanelFooter';
import { checkIfStarredEvent } from '../../util/general';

const formatDate = require('../../../server/utilities');

type Props = {
  hasMultipleTags?: boolean,
};

const SingleEventPure = ({
  addEventToFavorites,
  hasMultipleTags,
  imageStore,
  evt,
  evt: { date, description, location, name, photoCount, type, uuid },
  setNewBackgroundImage,
}: Props) => {
  const isStarred = checkIfStarredEvent(evt);

  return (
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
        evtFormattedDate={formatDate(date)}
        setNewBackgroundImage={setNewBackgroundImage}
        uuid={uuid}
      />
      <TLEventFooter
        evt={evt}
        evtType={type}
        addEventToFavorites={addEventToFavorites}
        hasMultipleTags={hasMultipleTags}
        isStarred={isStarred}
      />
    </li>
  );
};

SingleEventPure.displayName = 'SingleEvent';

SingleEventPure.propTypes = {
  addEventToFavorites: PropTypes.func.isRequired,
  classNames: ClassNamesPropType,
  evt: PropTypes.shape({
    date: PropTypes.string,
    description: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.string,
    name: PropTypes.string.isRequired,
    photoCount: PropTypes.number,
    type: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
  }).isRequired,
  hasMultipleTags: PropTypes.bool,
  imageStore: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }),
  setNewBackgroundImage: PropTypes.func.isRequired,
};

SingleEventPure.defaultProps = {
  classNames: null,
  hasMultipleTags: false,
  imageStore: null,
};

export default SingleEventPure;
