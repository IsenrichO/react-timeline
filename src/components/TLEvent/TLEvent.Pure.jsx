import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';
import EventPanelHeader from './EventPanelHeader';
import EventPanelBody from './EventPanelBody';
import EventPanelFooter from './EventPanelFooter';
import TLToolbar from './TLToolbar';
// import ConfirmDeletionModal from '../../ConfirmDeletionModal';
// import TLEventHeader from '../TLEventHeader';

const destructureEvent = (evtObj) => {
  let oo = {};
  for (let key in evtObj) {
    let formattedKey = `evt${key.charAt(0).toUpperCase()}${key.slice(1)}`;
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
    inverted: PropTypes.bool,
  };

  static defaultProps = {
    inverted: false,
  };

  constructor(props) {
    super(props);
  }

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
      hasMultipleTags, inverted, confirmDeleteModal, confirmDeletionEvt, imageData, cloudinaryImageStore,
      getMyImgs,
    } = this.props;

    const ci = cloudinaryImageStore.hasOwnProperty(uuid) && cloudinaryImageStore[uuid].images.length
      ? cloudinaryImageStore[uuid].images
      : null;

    return (
      <li
        className={classes(
          classNames.tlEvent,
          inverted && classNames.inverted,
        )}
      >
        <div
          className={classes(
            classNames.tlMarker,
            inverted && classNames.invertedMarker,
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
            inverted && classNames.invertedPanel,
          )}
        >
          <TLToolbar
            evt={evt}
            confirmDeletionEvt={confirmDeletionEvt}
            confirmDeleteModal={confirmDeleteModal}
            deleteEvt={deleteEvt}
            inverted={inverted}
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
            inverted={inverted}
          />
          <EventPanelBody
            {...evt}
            cloudinaryImageStore={ci}
            evt={evt}
            evtDate={evtDate}
            evtDescription={evtDescription}
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
