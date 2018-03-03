// @flow
import React, { Component }                                     from 'react';
import PropTypes                                                from 'prop-types';
import { classes, ClassNamesPropType }                          from 'aesthetic';
import { isArray, isEmpty, isString }                           from 'lodash';
import Icon                                                     from 'material-ui/Icon';
import EventPanelHeader                                         from './EventPanelHeader';
import EventPanelBody                                           from './EventPanelBody';
import EventPanelFooter                                         from './EventPanelFooter';
import TLToolbar                                                from './TLToolbar';
import { formatDate }                                           from '../../../server/utilities';
import { checkIfStarredEvent }                                  from '~/util/general';
import { cloudinaryImagePropTypes, nullable, tlEventPropTypes } from '~/util/TypeChecking';
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

export default class TLEventPure extends Component<Props> {
  static displayName = 'TimelineEvent';

  static propTypes = {
    addEventToFavorites: PropTypes.func,
    addSelectionToBatch: PropTypes.func,
    classNames: ClassNamesPropType.isRequired,
    confirmDeleteModal: PropTypes.func,
    confirmDeletionEvt: PropTypes.func,
    deleteEvt: PropTypes.func,
    evt: tlEventPropTypes.isRequired,
    evtClassName: PropTypes.string,
    imageData: nullable(PropTypes.shape({
      images: PropTypes.arrayOf(cloudinaryImagePropTypes),
      name: PropTypes.string,
      path: PropTypes.string,
    })),
    index: PropTypes.number.isRequired,
    isInverted: PropTypes.bool,
    logModalData: PropTypes.func,
    setEventInvertedState: PropTypes.func,
    setNewBackgroundImage: PropTypes.func,
    withAlternation: PropTypes.bool,
    withNumeral: PropTypes.bool,
    withPointer: PropTypes.bool,
    withToolbar: PropTypes.bool,
  };

  static defaultProps = {
    addEventToFavorites() {},
    addSelectionToBatch() {},
    confirmDeleteModal() {},
    confirmDeletionEvt() {},
    deleteEvt() {},
    evtClassName: null,
    imageData: null,
    isInverted: false,
    logModalData() {},
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

  destructureEvent = (evtObj) => {
    const oo = {};

    for (const key in evtObj) {
      const formattedKey = `evt${key.charAt(0).toUpperCase()}${key.slice(1)}`;
      oo[formattedKey] = evtObj[key];
    }

    return function() {
      return {};
    };
  };

  render() {
    const {
      addEventToFavorites,
      addSelectionToBatch,
      classNames,
      cloudinaryImageStore,
      confirmDeleteModal,
      confirmDeletionEvt,
      deleteEvt,
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
      getMyImgs,
      hasMultipleTags,
      imageData,
      index,
      isBatchSelectMode,
      isInBatch,
      logModalData,
      setEventInvertedState,
      toggleModal,
      withAlternation,
      withNumeral,
      withPointer,
      withToolbar,
    } = this.props;

    const isInverted = !!(index % 2);
    const isPassedEvtClassValid = !!evtClassName && isString(evtClassName);
    const isStarred = checkIfStarredEvent(evt);
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
            <Icon
              className={classes(
                'material-icons',
                classNames.tlMarkerIcon,
              )}
            >
              {!!isStarred ? 'stars' : 'adjust'}
            </Icon>
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
              confirmDeleteModal={confirmDeleteModal}
              confirmDeletionEvt={confirmDeletionEvt}
              deleteEvt={deleteEvt}
              evt={evt}
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
            hasMultipleTags={hasMultipleTags}
            isStarred={isStarred}
          />
        </div>
      </li>
    );
  }
}
