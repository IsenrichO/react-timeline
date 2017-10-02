import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';
import update from 'immutability-helper';
import uuidv4 from 'uuid/v4';
import { isEmpty, throttle } from 'lodash';
import ShowMoreControl from '../../Atomic/ShowMore';
import ImageReel from '../../partials/ImageReel';
import StaticGMap from '../../Atomic/StaticMap';
import { toggleAccordionSection } from '../../../utilities/utility_classes/general';


// Returns a function, that, as long as it continues to be invoked, will not
//  be triggered. The function will be called after it stops being called for
//  N milliseconds. If `immediate` is passed, trigger the function on the
//  leading edge, instead of the trailing.
const debounce = (func, wait, immediate) => {
  let timeout;
  return function() {
    const [context, args] = [this, arguments];
    const later = () => {
      timeout = null;
      if (!immediate) { func.apply(context, args); }
    };
    const callNow = (immediate && !timeout);

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) { func.apply(context, args); }
  };
};

// const debounceToggle = (evt) => debounce(toggleAccordionSection, 200, true)(evt),
const debounceToggle = function(evt) { return debounce(toggleAccordionSection, 200, true)(evt); };
const photosTagLine = (numPhotos) => `${numPhotos} Photo${numPhotos !== 1 ? 's' : ''}`;

export default class EventPanelBodyPure extends Component {
  static displayName = 'EventPanelBody';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    cloudinaryImageStore: PropTypes.array,
    evtDescription: PropTypes.string,
    evtFormattedDate: PropTypes.any,
    evtLocation: PropTypes.string,
    theme: PropTypes.string,
    uuid: PropTypes.string.isRequired,
  };

  static defaultProps = {
    cloudinaryImageStore: [],
    evtDescription: '',
    evtFormattedDate: '',
    evtLocation: 'Portland, OR',
    theme: 'base',
    uuid: uuidv4(),
  };

  constructor(props) {
    super(props);
    const { classNames } = props;
    // let { evt, evtDate, evtFormattedDate, evtDescription, evtLocation, photoCount, imageData, cloudinaryImageStore } = props;

    this.state = {
      isExpanded: false,
      linkText: 'SHOW MORE',
    };

    this.expansionTimer = null;
    this.delayLinkTextChange = throttle(::this.delayLinkTextChange, 600);
    this.slideExpandableContent = throttle(::this.slideExpandableContent, 600);
    this.toggleAccordionSection = throttle(toggleAccordionSection);
    this.throttleMapToggle = null;
    this.throttlePhotoToggle = null;
  }

  componentDidMount() {
    const { classNames } = this.props;
    const throttleOpts = [600, { leading: true, trailing: true }];

    this.throttleMapToggle = throttle(this.toggleAccordionSection(classNames, this.mapToggle), ...throttleOpts);
    this.throttlePhotoToggle = throttle(this.toggleAccordionSection(classNames, this.photosToggle), ...throttleOpts);
  }

  componentWillUnmount = () => this.clearExistingTimers();

  getScrollableHeight = () => {
    const domEl = findDOMNode(this.expandableDescription || this);
    return !isEmpty(domEl) && domEl.scrollHeight;
  };

  clearExistingTimers = () => clearTimeout(this.expansionTimer);

  // Returns a function, that, as long as it continues to be invoked, will not
  //  be triggered. The function will be called after it stops being called for
  //  N milliseconds. If `immediate` is passed, trigger the function on the
  //  leading edge, instead of the trailing.
  debounce = (func, wait, immediate) => {
    let timeout;
    return function() {
      const [context, args] = [this, arguments];
      const later = () => {
        timeout = null;
        if (!immediate) { func.apply(context, args); }
      };
      const callNow = (immediate && !timeout);

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) { func.apply(context, args); }
    };
  };

  delayLinkTextChange() {
    this.clearExistingTimers();

    const { isExpanded = false, linkText = 'SHOW MORE' } = this.state;

    this.setState(update(this.state, {
      isExpanded: { $set: !isExpanded },
    }));

    return setTimeout(() => {
      this.setState(update(this.state, {
        linkText: { $set: linkText.toUpperCase() === 'SHOW MORE'
          ? 'SHOW LESS'
          : 'SHOW MORE',
        },
      }));
    }, 575);
  }

  slideExpandableContent() {
    const { isExpanded } = this.state;

    return this.setState(update(this.state, {
      isExpanded: { $set: !isExpanded },
    }));
  }

  render() {
    const {
      classNames,
      classNames: { accordionContainer, accordionToggleBtn, bodyFieldIcon, tlRowSummary, toggleGlyph },
      cloudinaryImageStore,
      evtDescription,
      evtFormattedDate,
      evtLocation,
      uuid,
    } = this.props;
    const { isExpanded, linkText } = this.state;

    const hasOverflowDescription = evtDescription.trim().length >= 240;
    console.log({ evtDescription });

    return (
      <div className={classNames.panelBody}>
        <section
          className={classes(
            classNames.tlDescription,
            !!hasOverflowDescription && classNames.collapsibleDescription,
          )}
        >
          <blockquote
            ref={(expandableDescription) => { this.expandableDescription = expandableDescription; }}
            className={classes(
              classNames.bodyText,
              !!hasOverflowDescription && classNames[!isExpanded ? 'hidden' : 'shown'],
              !evtDescription.trim().length && classNames.emptySummary,
            )}
            style={{
              height: !!hasOverflowDescription && !!isExpanded
                ? this.getScrollableHeight()
                : null,
            }}
          >
            {evtDescription}
          </blockquote>
          <ShowMoreControl
            isExpanded={isExpanded}
            linkText={linkText}
            toggleContent={this.delayLinkTextChange}
            txtLen={evtDescription.length}
          />
        </section>

        {[
          !!hasOverflowDescription && (<br key={Math.random()} />),
          <hr
            key={Math.random()}
            className={classNames.panelBodyDivider}
          />,
        ]}

        <section className={classNames.tlDate}>
          <i className={classes('material-icons', bodyFieldIcon)}>
            event
          </i>
          <em>{evtFormattedDate}</em>
        </section>

        <section className={classNames.tlLocation}>
          <button
            className={classes(accordionContainer, accordionToggleBtn)}
            onClick={this.throttleMapToggle}
            type="button"
          >
            <div className={classes(accordionContainer, tlRowSummary)}>
              <i className={classes('material-icons', bodyFieldIcon)}>
                place
              </i>
              <em key={`Location_${evtLocation}`}>{evtLocation}</em>
              <i
                ref={(mapToggle) => { this.mapToggle = mapToggle; }}
                className={classes('material-icons', toggleGlyph)}
              >
                keyboard_arrow_right
              </i>
            </div>
            <StaticGMap evtLocation={evtLocation} />
          </button>
        </section>

        <section className={classNames.tlPhotos}>
          <button
            className={classes(accordionContainer, accordionToggleBtn)}
            onClick={this.throttlePhotoToggle}
            type="button"
          >
            <div className={classes(accordionContainer, tlRowSummary)}>
              <i className={classes('material-icons', bodyFieldIcon)}>
                collections
              </i>
              <em>{photosTagLine((cloudinaryImageStore && cloudinaryImageStore.length) || 0)}</em>
              <i
                ref={(photosToggle) => { this.photosToggle = photosToggle; }}
                className={classes('material-icons', toggleGlyph)}
              >
                keyboard_arrow_right
              </i>
            </div>
            <ImageReel
              images={cloudinaryImageStore}
              uuid={uuid}
            />
          </button>
        </section>
      </div>
    );
  }
}
