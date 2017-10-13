import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';
import FontIcon from 'material-ui/FontIcon';
import update from 'immutability-helper';
import { isEmpty, size, throttle } from 'lodash';
import ShowMoreControl from '../../Atomic/ShowMore';
import ImageReel from '../../partials/ImageReel';
import StaticGMap from '../../Atomic/StaticMap';
import { aesthetic } from '../../../style/styler';
import { toggleAccordionSection } from '../../../util/general';


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

export default class EventPanelBodyPure extends Component {
  static displayName = 'EventPanelBody';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    cloudinaryImageStore: PropTypes.arrayOf(PropTypes.object),
    evtDescription: PropTypes.arrayOf(PropTypes.string),
    evtFormattedDate: PropTypes.string,
    evtLocation: PropTypes.string,
    setNewBackgroundImage: PropTypes.func.isRequired,
    theme: PropTypes.string,
    uuid: PropTypes.string.isRequired,
  };

  static defaultProps = {
    cloudinaryImageStore: [],
    evtDescription: [''],
    evtFormattedDate: new Date(),
    evtLocation: 'Portland, OR',
    theme: 'base',
  };

  static getPhotosTagLine = (numPhotos) => `${numPhotos} Photo${numPhotos !== 1 ? 's' : ''}`;

  constructor(props) {
    super(props);
    const { theme = 'base' } = this.props;

    this.state = {
      isExpanded: false,
      linkText: 'SHOW MORE',
    };
    this.theme = aesthetic.themes[theme];

    this.expansionTimer = null;
    this.delayLinkTextChange = throttle(::this.delayLinkTextChange, 600);
    this.slideExpandableContent = throttle(::this.slideExpandableContent, 600);
    this.toggleAccordionSection = throttle(toggleAccordionSection);
    this.throttleMapToggle = null;
    this.throttlePhotoToggle = null;
  }

  componentDidMount() {
    const { classNames } = this.props;
    const throttleOpts = [600, { leading: true, trailing: false }];

    this.throttleMapToggle = throttle(this.toggleAccordionSection(classNames, this.mapToggle), ...throttleOpts);
    this.throttlePhotoToggle = throttle(this.toggleAccordionSection(classNames, this.photosToggle), ...throttleOpts);
  }

  componentWillUnmount = () => this.clearExistingTimers();

  getScrollableHeight = () => {
    const domEl = findDOMNode(this.expandableDescription || this);
    return !isEmpty(domEl) && domEl.scrollHeight;
  };

  clearExistingTimers = () => clearTimeout(this.expansionTimer);

  // Returns a function, that, while continuing to be invoked, will not
  //  be triggered. The function will be called after it stops being called for
  //  N milliseconds. If `immediate` is passed, trigger the function on the
  //  leading edge, instead of the trailing.
  debounce = (func, wait, immediate) => {
    let timeout;
    return function() {
      const [context, args] = [this, arguments]; // eslint-disable-line prefer-rest-params
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
      setNewBackgroundImage,
      uuid,
    } = this.props;
    const { isExpanded, linkText } = this.state;
    const { colors } = this.theme;

    const {
      black: { primary: themeBlack },
      red: { primary: themeRed },
    } = colors;
    const combinedDescription = evtDescription.join(' ').trim();
    const hasOverflowDescription = combinedDescription.length >= 240;

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
              !combinedDescription.length && classNames.emptySummary,
            )}
            style={{
              height: !!hasOverflowDescription && !!isExpanded
                ? this.getScrollableHeight()
                : null,
            }}
          >
            {evtDescription.map((paragraph, index) => [
              !!index && (<br key={`${uuid}ParagraphBreak${index + 1}`} />),
              <p key={`${uuid}EventDescriptionParagraph${index + 1}`}>
                {paragraph}
              </p>,
            ])}
          </blockquote>
          <ShowMoreControl
            isExpanded={isExpanded}
            linkText={linkText}
            toggleContent={this.delayLinkTextChange}
            txtLen={combinedDescription.length}
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
          <FontIcon
            className={classes('material-icons', bodyFieldIcon)}
            color={themeRed}
          >
            event
          </FontIcon>
          <em>{evtFormattedDate}</em>
        </section>

        <section className={classNames.tlLocation}>
          <div
            className={classes(accordionContainer, accordionToggleBtn)}
            onClick={this.throttleMapToggle}
            role="button"
            tabIndex={0}
          >
            <div className={classes(accordionContainer, tlRowSummary)}>
              <FontIcon
                className={classes('material-icons', bodyFieldIcon)}
                color={themeRed}
              >
                place
              </FontIcon>
              <em>{evtLocation}</em>
              <FontIcon
                ref={(mapToggle) => { this.mapToggle = mapToggle; }}
                className={classes('material-icons', toggleGlyph)}
                color={themeBlack}
              >
                keyboard_arrow_right
              </FontIcon>
            </div>
            <StaticGMap evtLocation={evtLocation} />
          </div>
        </section>

        <section className={classNames.tlPhotos}>
          <div
            className={classes(accordionContainer, accordionToggleBtn)}
            onClick={this.throttlePhotoToggle}
            role="button"
            tabIndex={0}
          >
            <div className={classes(accordionContainer, tlRowSummary)}>
              <FontIcon
                className={classes('material-icons', bodyFieldIcon)}
                color={themeRed}
              >
                collections
              </FontIcon>
              <em>{EventPanelBodyPure.getPhotosTagLine(size(cloudinaryImageStore) || 0)}</em>
              <FontIcon
                ref={(photosToggle) => { this.photosToggle = photosToggle; }}
                className={classes('material-icons', toggleGlyph)}
                color={themeBlack}
              >
                keyboard_arrow_right
              </FontIcon>
            </div>
            <ImageReel
              withEventCard
              images={cloudinaryImageStore}
              setNewBackgroundImage={setNewBackgroundImage}
              uuid={uuid}
            />
          </div>
        </section>
      </div>
    );
  }
}
