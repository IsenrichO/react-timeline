import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';
import StaticGMapsStyles from '../../../constants/json/GoogleMapsAPIStyles.json';

const MapStyle = `\
  https://maps.googleapis.com/maps/api/staticmap\

  &style=feature:administrative%7Celement:geometry%7Cvisibility:on\
  &style=feature:administrative%7Celement:labels%7Ccolor:0xB15B5B%7Cweight:0.5\
  &style=feature:administrative%7Celement:labels.text.fill%7Ccolor:0x8D4A4B%7Cweight:4\
  &style=feature:administrative.country%7Celement:geometry.stroke%7Ccolor:0x6473B7%7Cvisibility:simplified%7Cweight:6\
  &style=feature:administrative.land_parcel%7Celement:labels%7Cvisibility:off\
  &style=feature:administrative.locality%7Celement:labels%7Cvisibility:off\
  &style=feature:administrative.locality%7Celement:labels.text.stroke%7Cvisibility:on%7Cweight:1.5\
  &style=feature:administrative.neighborhood%7Celement:labels%7Cvisibility:off\
  &style=feature:landscape%7Celement:geometry.fill%7Ccolor:0xB15B5B%7Clightness:45\
  &style=feature:landscape.natural.landcover%7Celement:geometry.stroke%7Cvisibility:simplified\
  &style=feature:landscape.natural.terrain%7Cvisibility:off\
  &style=feature:poi%7Cvisibility:off\
  &style=feature:road.arterial%7Ccolor:0xD2D0D4%7Cvisibility:simplified\
  &style=feature:road.highway%7Ccolor:0xD7D5D8%7Cvisibility:off\
  &style=feature:road.highway%7Celement:labels.icon%7Cvisibility:off\
  &style=feature:road.highway.controlled_access%7Cvisibility:off\
  &style=feature:road.local%7Cvisibility:off\
  &style=feature:water%7Celement:geometry%7Ccolor:0x989D9B%7Cvisibility:simplified\
  &style=feature:transit%7Ccolor:0xD2D0D4%7Cvisibility:off`;



const mm = `\
  https://maps.googleapis.com/maps/api/staticmap\
  ?key=YOUR_API_KEY\
  &center=37.80020823990041,237.7996849060058\
  &zoom=9\
  &format=png\
  &maptype=roadmap\

  &style=element:geometry.fill%7Ccolor:0x003A48\
  &style=feature:administrative%7Celement:geometry.fill%7Ccolor:0x9F4547\
  &style=feature:administrative%7Celement:labels%7Ccolor:0xF3F7FF%7Cweight:1\
  &style=feature:administrative%7Celement:labels.text.stroke%7Cvisibility:off\
  &style=feature:administrative.country%7Celement:geometry.stroke%7Ccolor:0xE0C1C1%7Cvisibility:on\
  &style=feature:administrative.neighborhood%7Cvisibility:off\
  &style=feature:landscape%7Ccolor:0x9F4547\
  &style=feature:poi%7Ccolor:0x9F4547\
  &style=feature:poi%7Celement:labels%7Ccolor:0xFFF%7Clightness:-20%7Cvisibility:simplified%7Cweight:0.5\
  &style=feature:poi%7Celement:labels.icon%7Cvisibility:off\
  &style=feature:poi.business%7Cvisibility:off\
  &style=feature:poi.medical%7Cvisibility:off\
  &style=feature:poi.park%7Celement:geometry.fill%7Ccolor:0xBE5254\
  &style=feature:poi.place_of_worship%7Cvisibility:off\
  &style=feature:poi.sports_complex%7Cvisibility:off\
  &style=feature:road%7Ccolor:0xE0C1C1%7Cvisibility:simplified%7Cweight:0.5\
  &style=feature:road%7Celement:labels%7Cvisibility:off\
  &style=feature:road.arterial%7Cvisibility:simplified\
  &style=feature:road.arterial%7Celement:labels%7Cvisibility:off\
  &style=feature:road.highway.controlled_access%7Cvisibility:off\
  &style=feature:road.local%7Ccolor:0x5F292A%7Cvisibility:simplified\
  &style=feature:transit%7Cvisibility:off\
  &style=feature:transit%7Celement:labels%7Cvisibility:off\
  &style=feature:water%7Celement:geometry.fill%7Ccolor:0xB7BABE\
  &style=feature:water%7Celement:labels%7Cvisibility:off\

  &size=480x360`;


export default class StaticGMapPure extends Component {
  static displayName = 'StaticGoogleMap';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    evtLocation: PropTypes.string.isRequired,
  };

  static defaultProps = {
    evtLocation: 'Portland, OR',
  };

  constructor(props) {
    super(props);
    const { evtLocation } = props;

    this.BASE_URL = 'https://maps.googleapis.com/maps/api/staticmap';
    this.staticMapOpts = [
      this.BASE_URL,
      { key: process.env.GMAPS_STATIC_KEY },
      { center: evtLocation },
      { scale: 1 },
      // { markers: 'sdgaags' },  &markers=sdgaags
      { zoom: 9 },
      { format: 'png' },
      { maptype: 'roadmap' },
      this.translateJsonToUrl(StaticGMapsStyles),
      { size: '400x200' },
    ];
  }

  getStyleStrFromObj = (styleObj, delimiter = '%7C') => {
    const output = [];
    for (const style in styleObj) {
      output.push(`${style}:` + `${style === 'color'
        ? '0x' + styleObj[style].slice(1)
        : styleObj[style]}`);
    }
    return output.join(delimiter);
  };

  getStyleStrFromObj1 = (styleObj, delimiter = '%7C') => {
    const output = [];
    for (const style in styleObj) {
      output.push(`${style}=` + `${style === 'color'
        ? '0x' + styleObj[style].slice(1)
        : styleObj[style]}`);
    }
    return output.join(delimiter);
  };

  concatStyles = (styles) => {
    const output = [];
    styles.forEach((styleObj) => {
      output.push(this.getStyleStrFromObj(styleObj));
    });
    return output.join('%7C');
  };

  translateJsonToUrl = (json) => {
    const styleSubStrs = [];

    for (let i = 0; i < json.length; i++) {
      const curr = json[i];
      const styleStr = [
        curr.hasOwnProperty('featureType') ? `feature:${curr.featureType}` : '',
        curr.hasOwnProperty('elementType') ? `element:${curr.elementType}` : '',
        this.concatStyles(curr.stylers),
      ].filter(Boolean);
      styleSubStrs.push(`${!!styleSubStrs.length ? '&' : ''}${'style='.concat(styleStr.join('%7C'))}`);
    }
    return styleSubStrs.join('');
  };

  genereateFinalUrl = (queryParams) => queryParams.reduce((acc, curr, index) => acc +=
    (index === 1 ? '?' : !!index ? '&' : '') +
    (Object.prototype.toString.call(curr) === '[object Object]'
      ? this.getStyleStrFromObj1(curr)
      : curr), '');

  render() {
    const { classNames, evtLocation } = this.props;

    return (
      <div className={classNames.staticMapWrapper}>
        <img
          className={classNames.staticMapImage}
          alt={`Google Static Map for ${evtLocation}.`}
          src={this.genereateFinalUrl(this.staticMapOpts)}
        />
      </div>
    );
  }
}

// // Works:
// "https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyCPV-2q_c8mzFWeY6e70DvHqLP8Zvt7h1U&center=-33.9,151.14999999999998&zoom=12&format=png&maptype=roadmap&style=color:0xff5851%7Cvisibility:on&style=feature:administrative.neighborhood%7Celement:labels.text.fill%7Ccolor:0xffeb3b%7Cvisibility:simplified&style=feature:poi.school%7Celement:labels.text.fill%7Ccolor:0xffeb3b%7Cweight:1&size=480x360"

// // Doesn't:
// "https://maps.googleapis.com/maps/api/staticmap&key=AIzaSyCPV-2q_c8mzFWeY6e70DvHqLP8Zvt7h1U&center=37.80020823990041,237.7996849060058&zoom=9&format=png&maptype=roadmap&&style=element:geometry.fill%7Ccolor:0x003A48&style=feature:administrative%7Celement:geometry.fill%7Ccolor:0x9F4547&style=feature:administrative%7Celement:labels%7Ccolor:0xF3F7FF%7Cweight:1&style=feature:administrative%7Celement:labels.text.stroke%7Cvisibility:off&style=feature:administrative.country%7Celement:geometry.stroke%7Ccolor:0xE0C1C1%7Cvisibility:on&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:landscape%7Ccolor:0x9F4547&style=feature:poi%7Ccolor:0x9F4547&style=feature:poi%7Celement:labels%7Ccolor:0xFFF%7Clightness:-20%7Cvisibility:simplified%7Cweight:0.5&style=feature:poi%7Celement:labels.icon%7Cvisibility:off&style=feature:poi.business%7Cvisibility:off&style=feature:poi.medical%7Cvisibility:off&style=feature:poi.park%7Celement:geometry.fill%7Ccolor:0xBE5254&style=feature:poi.place_of_worship%7Cvisibility:off&style=feature:poi.sports_complex%7Cvisibility:off&style=feature:road%7Ccolor:0xE0C1C1%7Cvisibility:simplified%7Cweight:0.5&style=feature:road%7Celement:labels%7Cvisibility:off&style=feature:road.arterial%7Cvisibility:simplified&style=feature:road.arterial%7Celement:labels%7Cvisibility:off&style=feature:road.highway.controlled_access%7Cvisibility:off&style=feature:road.local%7Ccolor:0x5F292A%7Cvisibility:simplified&style=feature:transit%7Cvisibility:off&style=feature:transit%7Celement:labels%7Cvisibility:off&style=feature:water%7Celement:geometry.fill%7Ccolor:0xB7BABE&style=feature:water%7Celement:labels%7Cvisibility:off&size=400x200"
