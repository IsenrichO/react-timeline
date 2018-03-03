// @flow
import React, { Component }                               from 'react';
import PropTypes                                          from 'prop-types';
import { ClassNamesPropType }                             from 'aesthetic';
import { get, head, isEmpty }                             from 'lodash';
import dedent from 'dedent';
import update                                             from 'immutability-helper';
import IconButton                                         from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import NavigationMenuIcon                                 from 'material-ui-icons/Menu';
import MissingPhotoPlaceholderGlyph                       from '@root/assets/images/no-photo-placeholder.svg';
import ContentToolbar                                     from '~/components/views/EventDetailPage/ContentToolbar';
import { cloudinaryImageDataPropTypes, tlEventPropTypes } from '~/util/TypeChecking';

/* FLOW TYPES */
type Props = {
  eventName?: string,
  theme?: string,
};

type State = {
  scale: number,
  translateY: number,
};

export default class HeroBoxedDisplayPure extends Component<Props, State> {
  static displayName = 'HeroBoxedDisplay';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    event: tlEventPropTypes.isRequired,
    eventName: PropTypes.string,
    handleDrawerOpen: PropTypes.func.isRequired,
    imageData: cloudinaryImageDataPropTypes,
    theme: PropTypes.string,
  };

  static defaultProps = {
    eventName: '',
    imageData: null,
    theme: 'base',
  };

  constructor(props) {
    super(props);

    this.BASE_CONTAINER_HEIGHT = 600;

    this.getCoverPhoto = ::this.getCoverPhoto;
    this.getScaledFactor = ::this.getScaledFactor;
    this.getTranslationPosition= ::this.getTranslationPosition;
    this.handleScrollParallax = ::this.handleScrollParallax;
  }

  state = {
    scale: 1,
    translateY: 0,
  };

  componentDidMount = () => window.addEventListener('scroll', this.handleScrollParallax);

  componentWillUnmount = () => window.removeEventListener('scroll', this.handleScrollParallax);

  getCoverPhoto() {
    const { imageData } = this.props;

    const coverPhotoPath = isEmpty(imageData) || isEmpty(get(imageData, 'images', []))
      ? MissingPhotoPlaceholderGlyph
      : get(head(imageData.images), 'secure_url', MissingPhotoPlaceholderGlyph);
    return `url("${coverPhotoPath}")`;
  }

  getScaledFactor() {
    const { translateY } = this.state;
    const scaleFactor = ((this.BASE_CONTAINER_HEIGHT + translateY) / this.BASE_CONTAINER_HEIGHT);

    return this.setState(update(this.state, {
      scale: { $set: +scaleFactor.toFixed(4) },
    }));
  }

  getTranslationPosition() {
    const yOffset = window.scrollY;

    return this.setState(update(this.state, {
      translateY: { $set: +(yOffset / 3).toFixed(4) },
    }));
  }

  getAdjustedOpacity() {
    const yOffset = window.scrollY;
  }

  async handleScrollParallax() {
    await this.getTranslationPosition();
    await this.getScaledFactor();
  }

  render() {
    const {
      classNames,
      event: { layout },
      eventName,
      handleDrawerOpen,
    } = this.props;
    const { scale, translateY } = this.state;
    const drawerOpenIconId = 'events-drawer-open-icon'; // rgba(0, 0, 0, 0.45)

    return (
      <div className={classNames.boxedDisplayContainer}>
        <Tooltip
          enterDelay={350}
          id={drawerOpenIconId}
          placement="bottom"
          title={<span>Events</span>}
        >
          <IconButton
            aria-describedby={drawerOpenIconId}
            aria-label="Show Events"
            className={classNames.eventsDrawerToggleButton}
            onClick={handleDrawerOpen}
          >
            <NavigationMenuIcon />
          </IconButton>
        </Tooltip>
        <div className={classNames.boxedDisplayHeroContainer}>
          <div
            className={classNames.backgroundImageContainer}
            style={{
              backgroundImage: this.getCoverPhoto(),
              transform: dedent`translate3d(0, -${translateY}px , 0) scale(${scale}, ${scale})`,
            }}
          >
            <header className={classNames.boxedDisplayHeader}>
              <h1 className={classNames.eventTitle}>{eventName}</h1>
            </header>
          </div>
        </div>
        <ContentToolbar
          key="DndContentSelectionToolbar"
          passedClasses={!isEmpty(layout)
            ? 'contentToolbarVisible'
            : null
          }
        />
      </div>
    );
  }
}
