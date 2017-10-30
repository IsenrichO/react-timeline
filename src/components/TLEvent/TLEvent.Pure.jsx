// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';
import { isArray, isEmpty, isString } from 'lodash';
import FontIcon from 'material-ui/FontIcon';
import EventPanelHeader from './EventPanelHeader';
import EventPanelBody from './EventPanelBody';
import EventPanelFooter from './EventPanelFooter';
import TLToolbar from './TLToolbar';
import { formatDate } from '../../../server/utilities';
// import ConfirmDeletionPrompt from '../partials/ConfirmDeletionPrompt';

type Props = {
  evtClassName?: string,
  index: number,
  isInverted?: boolean,
  withAlternation?: boolean,
  withNumeral?: boolean,
  withPointer?: boolean,
  withToolbar?: boolean,
};

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

export default class TLEventPure extends Component<Props> {
  static displayName = 'TimelineEventPure';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    evtClassName: PropTypes.string,
    index: PropTypes.number.isRequired,
    isInverted: PropTypes.bool,
    setEventInvertedState: PropTypes.func,
    setNewBackgroundImage: PropTypes.func,
    withAlternation: PropTypes.bool,
    withNumeral: PropTypes.bool,
    withPointer: PropTypes.bool,
    withToolbar: PropTypes.bool,
  };

  static defaultProps = {
    evtClassName: null,
    isInverted: false,
    setEventInvertedState() {},
    setNewBackgroundImage() {},
    withAlternation: false,
    withNumeral: false,
    withPointer: false,
    withToolbar: false,
  };

  static isHomeRoute = () => {
    const { pathname = '' } = window.location;
    return isEmpty(pathname) || (pathname === '/');
  };

  static validateEventDescription = (description = []) => isArray(description)
    ? description
      .filter((paragraph) => isString(paragraph) && !isEmpty(paragraph.trim()))
      .map((paragraph) => paragraph.trim())
    : null;

  constructor(props) {
    super(props);

    this.setNewBackgroundImage = ::this.setNewBackgroundImage;
  }

  setNewBackgroundImage(imgUrl) {
    const { setNewBackgroundImage } = this.props;
    return setNewBackgroundImage(imgUrl);
  }

  render() {
    const {
      classNames,
      evt,
      evt: {
        name: evtName,
        date: evtDate,
        description: evtDescription,
        location: evtLocation,
        type: evtType,
        photoCount,
        uuid,
      },
      evtClassName,
      index,
      logModalData, toggleModal, deleteEvt, addSelectionToBatch, isInBatch, addEventToFavorites, getStarGlyphClass,
      hasMultipleTags, confirmDeleteModal, confirmDeletionEvt, imageData, isBatchSelectMode, cloudinaryImageStore,
      getMyImgs,
      setEventInvertedState,
      withAlternation,
      withNumeral,
      withPointer,
      withToolbar,
    } = this.props;
    const isInverted = !!(index % 2);
    const isPassedEvtClassValid = !!evtClassName && isString(evtClassName);

    const ci = cloudinaryImageStore.hasOwnProperty(uuid) && cloudinaryImageStore[uuid].images.length
      ? cloudinaryImageStore[uuid].images
      : null;

    return (
      <li
        className={classes(
          classNames.tlEvent,
          !!isPassedEvtClassValid && evtClassName,
          !!withAlternation && !!isInverted && classNames.inverted,
        )}
      >
        {!!withAlternation && (
          <div
            className={classes(
              classNames.tlMarker,
              !!isInverted && classNames.invertedMarker,
            )}
          >
            <FontIcon
              className={classes(
                'material-icons',
                classNames.tlMarkerIcon,
              )}
            >
              {!!getStarGlyphClass ? 'stars' : 'adjust'}
            </FontIcon>
          </div>
        )}
        <div
          className={classes(
            classNames.inView,
            classNames.tlEventPanel,
            !!isInBatch && classNames.batchSelectActive,
            !!isPassedEvtClassValid && classNames.tlEventPanelFullWidth,
            !!withAlternation && !!isInverted && classNames.invertedPanel,
          )}
        >
          {!!withToolbar && (
            <TLToolbar
              evt={evt}
              confirmDeletionEvt={confirmDeletionEvt}
              confirmDeleteModal={confirmDeleteModal}
              deleteEvt={deleteEvt}
              isInverted={isInverted}
              logModalData={logModalData}
              setEventInvertedState={setEventInvertedState}
              toggleModal={toggleModal}
            />
          )}
          <EventPanelHeader
            addSelectionToBatch={addSelectionToBatch}
            evtName={evtName}
            evtUuid={uuid}
            imageData={imageData}
            index={index}
            isBatchSelectMode={isBatchSelectMode}
            isInBatch={isInBatch}
            isInverted={isInverted}
            withAlternation={!!withAlternation}
            withNumeral={!!withNumeral}
            withPointer={!!withPointer || TLEventPure.isHomeRoute()}
          />
          <EventPanelBody
            {...evt}
            cloudinaryImageStore={ci}
            evt={evt}
            evtDate={evtDate}
            evtDescription={TLEventPure.validateEventDescription(evtDescription)}
            evtFormattedDate={formatDate(evtDate)}
            evtLocation={evtLocation}
            getMyImgs={getMyImgs}
            photoCount={photoCount}
            setNewBackgroundImage={this.setNewBackgroundImage}
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
