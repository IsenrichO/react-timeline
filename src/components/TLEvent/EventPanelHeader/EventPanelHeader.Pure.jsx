import PropTypes from 'prop-types';
import React from 'react';
import { inRange, isArray, isEmpty, isNumber } from 'lodash';
import { classes, ClassNamesPropType } from 'aesthetic';

import TlEventItemActionControl from '../../Atomic/TLEventItemActionControl';
import FallbackCardHeroImages from '../../../../assets/images/fallback';
// import BackgroundImageFallback from '../../../../../assets/images/tile-bg-6.jpg';

const urlBase = 'http://res.cloudinary.com/http-isenrich-io/image/upload/';
const fetchHeroImage = (images = []) => isArray(images)
  && (images.some((img) => img.hasOwnProperty('isHeroImg') && !!img.isHeroImg)
    ? images.find((img) => !!img.isHeroImg)
    : images[0]
  ).secure_url;

const getRandConstrainedInt = (specifiedInt) => isNumber(specifiedInt) && inRange(specifiedInt, 1, 9)
  ? specifiedInt
  : Math.round((Math.random() * 7) + 1);

const EventPanelHeaderPure = ({
  addSelectionToBatch,
  batchSelectionState,
  classNames,
  evtName,
  evtUuid,
  imageData,
  index,
  isInverted,
}) => {
  return (
    <header
      className={classes(
        classNames.panelHeader,
        !!isInverted && classNames.invertedPanel,
      )}
      style={{
        backgroundImage: `url('${(!isEmpty(imageData) && fetchHeroImage(imageData.images))
          || FallbackCardHeroImages[`FallbackCardHero${getRandConstrainedInt((index % 7) + 1)}`]}')`, // BackgroundImageFallback
      }}
      // style={{ backgroundImage: imageData ? `url(${urlBase}${<encodeURI><imageData class="public_id"></imageData></encodeURI>})` : 'none' }}
    >
      <TlEventItemActionControl
        addSelectionToBatch={addSelectionToBatch}
        batchSelectionState={batchSelectionState}
        evtUuid={evtUuid}
        isInverted={isInverted}
      />
      <h3 className={classNames.panelHeaderTitle}>{ evtName }</h3>
    </header>
  );
};

EventPanelHeaderPure.displayName = 'EventPanelHeaderPure';

EventPanelHeaderPure.propTypes = {
  addSelectionToBatch: PropTypes.func.isRequired,
  batchSelectionState: PropTypes.bool.isRequired,
  classNames: ClassNamesPropType.isRequired,
  evtName: PropTypes.string.isRequired,
  evtUuid: PropTypes.string.isRequired,
  imageData: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isInverted: PropTypes.bool,
};

EventPanelHeaderPure.defaultProps = {
  addSelectionToBatch() {},
  batchSelectionState: false,
  imageData: {},
  isInverted: false,
};

export default EventPanelHeaderPure;
