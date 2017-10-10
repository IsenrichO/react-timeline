import React from 'react';
import Utils from '../../utilities/index';


const urlBase = 'http://res.cloudinary.com/http-isenrich-io/image/upload/',
      fetchHeroImage = (images) => (images.some(img => img.hasOwnProperty('isHeroImg') && !!img.isHeroImg)
        ? images.find(img => !!img.isHeroImg)
        : images[0]).secure_url;

const TLEventHeader = ({ addSelectionToBatch, evtName, evtUuid, imageData, isBatchSelectMode, isInverted }) => (
  <header
    className={`panel-header${!!isInverted ? ' inverted' : ''}`}
    // style={{ backgroundImage: imageData ? `url(${urlBase}${<encodeURI><imageData class="public_id"></imageData></encodeURI>})` : 'none' }}
    style={{
      backgroundImage: !!imageData
        ? `url(${fetchHeroImage(imageData.images)})`
        : 'none',
    }}
  >
    {Utils.renderItemActionControl(isBatchSelectMode, evtUuid, addSelectionToBatch)}
    <h3>{ evtName }</h3>
  </header>
);

export default TLEventHeader;
