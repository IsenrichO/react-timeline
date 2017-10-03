import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';
import { isArray, isEmpty, isString } from 'lodash';
import EventPanelHeader from './EventPanelHeader';
import EventPanelBody from './EventPanelBody';
import EventPanelFooter from './EventPanelFooter';
import TLToolbar from './TLToolbar';
// import ConfirmDeletionModal from '../../ConfirmDeletionModal';
// import TLEventHeader from '../TLEventHeader';

const destructureEvent = (evtObj) => {
  const oo = {};

  for (const key in evtObj) {
    const formattedKey = `evt${key.charAt(0).toUpperCase()}${key.slice(1)}`;
    oo[formattedKey] = evtObj[key];
  }

  return function() {
    return {};
  };
};

export default class TLEventPure extends Component {
  static displayName = 'TimelineEventPure';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    index: PropTypes.number.isRequired,
    isInverted: PropTypes.bool,
  };

  static defaultProps = {
    isInverted: false,
  };

  static validateEventDescription = (description = []) => isArray(description)
    ? description
      .filter((paragraph) => isString(paragraph) && !isEmpty(paragraph.trim()))
      .map((paragraph) => paragraph.trim())
    : null;

  render() {
    const {
      classNames,
      evt,
      evt: {
        name: evtName,
        date: evtDate,
        formattedDate: evtFormattedDate,
        description: evtDescription,
        location: evtLocation,
        type: evtType,
        photoCount,
        uuid,
      },
      index,
      evtAlign, logModalData, toggleModal, deleteEvt, batchSelectionState, addSelectionToBatch, isInBatch, addEventToFavorites, getStarGlyphClass,
      hasMultipleTags, isInverted, confirmDeleteModal, confirmDeletionEvt, imageData, cloudinaryImageStore,
      getMyImgs,
    } = this.props;
    console.log({ evt });
    const ci = cloudinaryImageStore.hasOwnProperty(uuid) && cloudinaryImageStore[uuid].images.length
      ? cloudinaryImageStore[uuid].images
      : null;

    return (
      <li
        className={classes(
          classNames.tlEvent,
          !!isInverted && classNames.inverted,
        )}
      >
        <div
          className={classes(
            classNames.tlMarker,
            !!isInverted && classNames.invertedMarker,
          )}
        >
          <i
            className={classes(
              'material-icons',
              classNames.tlMarkerIcon,
            )}
          >
            {!!getStarGlyphClass ? 'stars' : 'adjust'}
          </i>
        </div>
        <div
          className={classes(
            classNames.inView,
            classNames.tlEventPanel,
            isInBatch && classNames.batchSelectActive,
            !!isInverted && classNames.invertedPanel,
          )}
        >
          <TLToolbar
            evt={evt}
            confirmDeletionEvt={confirmDeletionEvt}
            confirmDeleteModal={confirmDeleteModal}
            deleteEvt={deleteEvt}
            isInverted={isInverted}
            logModalData={logModalData}
            toggleModal={toggleModal}
          />
          <EventPanelHeader
            addSelectionToBatch={addSelectionToBatch}
            batchSelectionState={batchSelectionState}
            evtName={evtName}
            evtUuid={uuid}
            imageData={imageData}
            index={index}
            isInverted={isInverted}
          />
          <EventPanelBody
            {...evt}
            cloudinaryImageStore={ci}
            evt={evt}
            evtDate={evtDate}
            evtDescription={TLEventPure.validateEventDescription(evtDescription)}
            evtFormattedDate={evtFormattedDate}
            evtLocation={evtLocation}
            getMyImgs={getMyImgs}
            // imageData={imageData}
            photoCount={photoCount}
            uuid={uuid}
          />
          <EventPanelFooter
            addEventToFavorites={addEventToFavorites}
            evt={evt}
            evtType={evtType}
            getStarGlyphClass={getStarGlyphClass}
            hasMultipleTags={hasMultipleTags}
          />
        </div>
      </li>
    );
  }
}
