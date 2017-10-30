import PropTypes from 'prop-types';
import React from 'react';
import { inRange, isArray, isEmpty, isNumber } from 'lodash';
import { classes, ClassNamesPropType } from 'aesthetic';
import NumericSignifier from '../../Atomic/NumericSignifier';
import TlEventItemActionControl from '../../Atomic/TLEventItemActionControl';
import FallbackCardHeroImages from '../../../../assets/images/fallback';

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
  classNames,
  evtName,
  evtUuid,
  imageData,
  index,
  isBatchSelectMode,
  isInBatch,
  isInverted,
  withAlternation,
  withNumeral,
  withPointer,
}) => (
  <header className={classNames.panelHeaderContainer}>
    {!!withNumeral && (
      <NumericSignifier numeral={index + 1} />
    )}
    <div
      className={classes(
        classNames.panelHeaderShape,
        !!isInverted && classNames.invertedPanel,
        !!withPointer && classNames.panelHeaderShapeWithPointer,
      )}
      style={{
        backgroundImage: `url('${(!isEmpty(imageData) && fetchHeroImage(imageData.images))
          || FallbackCardHeroImages[`FallbackCardHero${getRandConstrainedInt((index % 7) + 1)}`]}')`, // BackgroundImageFallback
      }}
      // style={{ backgroundImage: imageData ? `url(${urlBase}${<encodeURI><imageData class="public_id"></imageData></encodeURI>})` : 'none' }}
    >
      <TlEventItemActionControl
        addSelectionToBatch={addSelectionToBatch}
        evtUuid={evtUuid}
        isBatchSelectMode={isBatchSelectMode}
        isInBatch={isInBatch}
        isInverted={isInverted}
        withAlternation={withAlternation}
      />
      <h3
        className={classNames.panelHeaderTitle}
        style={{
          textAlign: !withAlternation
            ? 'start'
            : null,
        }}
      >
        {evtName}
      </h3>
    </div>
  </header>
);

EventPanelHeaderPure.displayName = 'EventPanelHeader';

EventPanelHeaderPure.propTypes = {
  addSelectionToBatch: PropTypes.func.isRequired,
  classNames: ClassNamesPropType.isRequired,
  evtName: PropTypes.string.isRequired,
  evtUuid: PropTypes.string.isRequired,
  imageData: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string,
    path: PropTypes.string,
  }),
  index: PropTypes.number,
  isBatchSelectMode: PropTypes.bool,
  isInBatch: PropTypes.bool,
  isInverted: PropTypes.bool,
  withAlternation: PropTypes.bool,
  withNumeral: PropTypes.bool,
  withPointer: PropTypes.bool,
};

EventPanelHeaderPure.defaultProps = {
  addSelectionToBatch() {},
  imageData: {},
  index: 0,
  isBatchSelectMode: false,
  isInBatch: false,
  isInverted: false,
  withAlternation: false,
  withNumeral: false,
  withPointer: false,
};

export default EventPanelHeaderPure;
