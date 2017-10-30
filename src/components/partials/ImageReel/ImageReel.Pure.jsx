import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import uuidv4 from 'uuid/v4';
import { FontIcon, IconButton} from 'material-ui';
import { capitalize, isArray, isEmpty, isEqual, isNil, size } from 'lodash';
import { classes, ClassNamesPropType } from 'aesthetic';
import ImageThumbnail from './ImageThumbnail';
import { aesthetic } from '../../../style/styler';

export default class ImageReelPure extends Component {
  static displayName = 'ImageReel';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        access_mode: PropTypes.oneOf([
          'private',
          'public',
        ]),
        bytes: PropTypes.number,
        created_at: PropTypes.string,
        format: PropTypes.oneOf([
          'bmp',
          'gif',
          'jpg',
          'png',
          'svg',
        ]),
        height: PropTypes.number,
        name: PropTypes.string,
        public_id: PropTypes.string,
        resource_type: PropTypes.oneOf([
          'image',
          'video',
        ]).isRequired,
        secure_url: PropTypes.string.isRequired,
        size: PropTypes.number,
        type: PropTypes.string,
        url: PropTypes.string.isRequired,
        version: PropTypes.number,
        width: PropTypes.number,
      }).isRequired,
    ),
    setNewBackgroundImage: PropTypes.func,
    theme: PropTypes.string,
    uuid: PropTypes.string.isRequired,
    withEventCard: PropTypes.bool,
  };

  static defaultProps = {
    images: [{
      access_mode: 'public',
      bytes: 0,
      created_at: '2017-03-15T10:51:31Z',
      format: 'jpg',
      height: 4000,
      name: '',
      public_id: 'React-Timeline/TEST0002-c08e-4be6-9459-51cf632a2e79/Site_bg-min',
      resource_type: 'image',
      secure_url: 'https://lorempixel.com/1920/1920/abstract/',
      size: 10000,
      type: 'upload',
      url: 'http://lorempixel.com/1920/1920/abstract/',
      version: 1000000000,
      width: 6000,
    }],
    setNewBackgroundImage() {},
    theme: 'base',
    uuid: uuidv4(),
    withEventCard: false,
  };

  constructor(props) {
    super(props);
    const { images = [], theme = 'base' } = props;

    this.state = {
      imageReelShift: 0,
      lateralShift: 0,
      thumbs: !isNil(images) && isArray(images)
        ? images
        : [],
    };

    this.DIRS = {
      NEXT: 'PAN_RIGHT',
      PREV: 'PAN_LEFT',
    };
    const { NEXT, PREV } = this.DIRS;
    this.DIR_MAP = new Map([
      [NEXT, 'right'],
      [PREV, 'left'],
    ]);

    this.theme = aesthetic.themes[theme];
    this.panLeft = ::this.panReel(PREV);
    this.panRight = ::this.panReel(NEXT);
    this._removeThumbnailFromState = ::this._removeThumbnailFromState;
  }

  componentWillReceiveProps({ images: nextImages }) {
    const { images } = this.props;

    return !isEqual(images, nextImages)
      ? this.setState(update(this.state, {
        thumbs: { $set: nextImages },
      }))
      : null;
  }

  getElementMargin = (el) => {
    const { margin: marginDeclaration = '0px 0px' } = (window.getComputedStyle(el) || {});
    const parsedMarginSyntax = marginDeclaration.split(/\s/);

    const makeUnitlessInt = (cssStyleVal = '0px') => Number.parseFloat(cssStyleVal, 10);

    switch (!!parsedMarginSyntax.length) {
      case parsedMarginSyntax.length === 1: {
        const [all] = parsedMarginSyntax;
        const marginValue = makeUnitlessInt(all);
        return {
          bottom: marginValue,
          left: marginValue,
          right: marginValue,
          top: marginValue,
        };
      }
      case parsedMarginSyntax.length === 2: {
        const [vertical, horizontal] = parsedMarginSyntax;
        return {
          bottom: makeUnitlessInt(vertical),
          left: makeUnitlessInt(horizontal),
          right: makeUnitlessInt(horizontal),
          top: makeUnitlessInt(vertical),
        };
      }
      case parsedMarginSyntax.length === 3: {
        const [top, horizontal, bottom] = parsedMarginSyntax;
        return {
          bottom: makeUnitlessInt(bottom),
          left: makeUnitlessInt(horizontal),
          right: makeUnitlessInt(horizontal),
          top: makeUnitlessInt(top),
        };
      }
      case parsedMarginSyntax.length === 4: {
        const [top, right, bottom, left] = parsedMarginSyntax;
        return {
          bottom: makeUnitlessInt(bottom),
          left: makeUnitlessInt(left),
          right: makeUnitlessInt(right),
          top: makeUnitlessInt(top),
        };
      }
      default:
        break;
    }
  };

  createNewThumbnail({ name: fileName }, src) {
    const { classNames } = this.props;

    return (
      <div className={classNames.imageReelThumb}>
        <img
          alt={`Thumbnail graphic '${fileName}'`}
          src={src}
          title={`'${fileName.replace(/['"]/gm, '')}'`}
        />
      </div>
    );
  }

  _addImageToState(image) {
    return this.setState(update(this.state, {
      thumbs: { $push: image },
    }));
  }

  _removeThumbnailFromState(imageIndex) {
    const { thumbs = [] } = this.state;

    return this.setState(update(this.state, {
      thumbs: { $splice: [[imageIndex, 1]] },
    }));
  }

  // Allows for smooth lateral panning of the image reel when enough images are present
  // as to overflow outside the containing element's side boundaries:
  panReel(direction = this.DIRS.NEXT) {
    const { imageReelShift, lateralShift } = this.state;
    const { NEXT, PREV } = this.DIRS;

    if (isNil(this.imageReelEl)) return;

    const firstThumbEl = findDOMNode(this.thumbEl);
    const adjustmentFactorParity = Math.sign([null, PREV].indexOf(direction));
    const { width: thumbWrapperWidth } = firstThumbEl.getBoundingClientRect();
    const firstThumbOffset = thumbWrapperWidth
      + (2 * this.getElementMargin(firstThumbEl).left)
      - 7;

    if (!!lateralShift
      && (((imageReelShift <= -lateralShift) && (direction === NEXT))
      || ((imageReelShift >= lateralShift) && (direction === PREV)))
    ) return;

    this.setState(update(this.state, {
      imageReelShift: { $apply: (curr) => curr + (adjustmentFactorParity * firstThumbOffset) },
      lateralShift: { $set: firstThumbOffset },
    }));
  }

  // Appends a `.thumb` <div> with nested a <img> element to specified output target:
  readInThumbnailWithImageElement = (file) => {
    (function(imageFile) {
      const Reader = new FileReader();
      Reader.onload = (evt) => this._addImageToState(this.createNewThumbnail(imageFile, evt.target.result));

      // Read in the image file as a data URL:
      Reader.readAsDataURL(imageFile);
    })(file);
  };

  // 
  renderReelNavigation(direction = this.DIRS.NEXT, numImages) {
    const { classNames } = this.props;
    const { helpers } = this.theme;
    const currDir = capitalize(this.DIR_MAP.get(direction));

    return (
      <div
        className={classes(
          classNames.navArrowWrapper,
          classNames[`navAlign${currDir}`],
        )}
      >
        <IconButton
          key={`imageReel${currDir}Nav`}
          className={classNames[`pan${currDir}`]}
          onClick={(evt) => this.panReel(direction, evt)}
          style={{
            ...helpers.styleInheritor('height', 'width'),
          }}
        >
          <FontIcon
            className={classes(
              'material-icons',
              classNames.reelNavArrowIcon,
              classNames[`reelNavArrow${currDir}`],
            )}
          >
            {`chevron_${currDir.toLowerCase()}`}
          </FontIcon>
        </IconButton>
      </div>
    );
  }

  renderThumbs = (thumbs = []) => !isEmpty(thumbs) && thumbs.map(({ isHeroImg, secure_url, ...imgMeta }, index) => (
    <ImageThumbnail
      {...imgMeta}
      key={Math.random()}
      imageRemovalHandler={this._removeThumbnailFromState}
      imageSelectionHandler={this.props.setNewBackgroundImage}
      isSelected={!!isHeroImg}
      thumbRef={!index
        ? (thumbEl) => { this.thumbEl = thumbEl; }
        : null
      }
      thumbSource={secure_url}
    />
  ));

  render() {
    const { classNames, withEventCard } = this.props;
    const { imageReelShift, thumbs } = this.state;
    const { NEXT, PREV } = this.DIRS;

    const withNavArrows = size(thumbs) > 2;

    return (
      <output
        className={classes(
          classNames.imageReel,
          !!withEventCard && classNames.withEventCard,
        )}
        htmlFor="file-upload-btn"
        name="photos"
        style={{
          height: isEmpty(thumbs)
            ? '4em' // Reduce `height` for empty content box
            : null, // Fallback to value set in JSS style declaration
        }}
      >
        <div
          className={classes(
            classNames.offsetWrapper,
            !!withEventCard && classNames.offsetWrapperWithEventCard,
          )}
          style={{
            justifyContent: !!thumbs && !withNavArrows
              ? 'flex-start'
              : 'space-around',
          }}
        >
          {!!withNavArrows && this.renderReelNavigation(PREV, size(thumbs))}
          <div
            ref={(imageReelEl) => { this.imageReelEl = imageReelEl; }}
            className={classes(
              classNames.reelContainer,
              isEmpty(thumbs) && classNames.reelWithFallbackMessage,
            )}
            style={{
              transform: `translateX(${imageReelShift}px)`,
            }}
          >
            {this.renderThumbs(thumbs)}
          </div>
          {!!withNavArrows && this.renderReelNavigation(NEXT, size(thumbs))}
        </div>
      </output>
    );
  }
}
