import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import uuidv4 from 'uuid/v4';
import { capitalize, isEmpty, isEqual, isNil, size } from 'lodash';
import { classes, ClassNamesPropType } from 'aesthetic';
import ImageThumbnail from './ImageThumbnail';

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
        public_id: PropTypes.string.isRequired,
        resource_type: PropTypes.oneOf([
          'image',
          'video',
        ]).isRequired,
        secure_url: PropTypes.string.isRequired,
        type: PropTypes.string,
        url: PropTypes.string.isRequired,
        version: PropTypes.number,
        width: PropTypes.number,
      }).isRequired,
    ),
    uuid: PropTypes.string.isRequired,
  };

  static defaultProps = {
    images: [{
      access_mode: 'public',
      bytes: 0,
      created_at: '2017-03-15T10:51:31Z',
      format: 'jpg',
      height: 4000,
      public_id: 'React-Timeline/TEST0002-c08e-4be6-9459-51cf632a2e79/Site_bg-min',
      resource_type: 'image',
      secure_url: 'https://lorempixel.com/1920/1920/abstract/',
      type: 'upload',
      url: 'http://lorempixel.com/1920/1920/abstract/',
      version: 1000000000,
      width: 6000,
    }],
    uuid: uuidv4(),
  };

  constructor(props) {
    super(props);
    const { theme = 'base' } = props;

    this.state = {
      imageReelShift: 0,
      lateralShift: 0,
      thumbs: [],
    };

    this.DIRS = {
      NEXT: 'PAN_RIGHT',
      PREV: 'PAN_LEFT',
    };

    this.panRight = ::this.panReel(this.DIRS.NEXT);
    this.panLeft = ::this.panReel(this.DIRS.PREV);
  }

  componentWillReceiveProps({ images: nextImages }) {
    const { images } = this.props;

    return !isEqual(images, nextImages)
      ? this._addImageToState(nextImages)
      : null;
  }

  _addImageToState(image) {
    return this.setState(update(this.state, {
      thumbs: { $push: image },
    }));
  }

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

  // Allows for smooth lateral panning of the image reel when enough images are present
  // as to overflow outside the containing element's side boundaries:
  panReel(direction = this.DIRS.NEXT) {
    const { imageReelShift, lateralShift } = this.state;
    const { NEXT, PREV } = this.DIRS;

    if (isNil(this.imageReelEl)) return;

    const reelEl = findDOMNode(this.imageReelEl || this);
    const firstThumbEl = findDOMNode(this.thumbEl);
    console.log({ firstThumbEl, reelEl });

    const reelWidth = reelEl.scrollWidth;
    const adjustmentFactorParity = Math.sign([null, NEXT].indexOf(direction));
    console.log({ adjustmentFactorParity, reelWidth });

    const { width: thumbWrapperWidth } = firstThumbEl.getBoundingClientRect();
    const firstThumbOffset = thumbWrapperWidth
      + (2 * this.getElementMargin(firstThumbEl).left)
      - 7;

    if (!!lateralShift
      && (((imageReelShift >= lateralShift) && (direction === NEXT))
      || ((imageReelShift <= -lateralShift) && (direction === PREV)))
    ) return;

    this.setState(update(this.state, {
      imageReelShift: { $apply: (curr) => curr + (adjustmentFactorParity * firstThumbOffset) },
      lateralShift: { $set: firstThumbOffset },
    }));
  }

  // Appends a `.thumb` <div> with nested a <img> element to specified output target:
  readInThumbnailWithImageElement(file) {
    (function(file) {
      const Reader = new FileReader();
      Reader.onload = (evt) => Reader.onload = (evt) => this._addImageToState(this.createNewThumbnail(file, evt.target.result));

      // Read in the image file as a data URL:
      Reader.readAsDataURL(file);
    })(file);
  }

  // 
  renderReelNavigation(direction = this.DIRS.NEXT, numImages) {
    // if (numImages <= 2) return;

    const { classNames } = this.props;
    const { NEXT, PREV } = this.DIRS;

    const dirMap = new Map([
      [NEXT, 'right'],
      [PREV, 'left'],
    ]);

    return (
      <div
        className={classes(
          classNames.navArrowWrapper,
          classNames[`navAlign${capitalize(dirMap.get(direction))}`],
        )}
      >
        <div
          key={`imageRseel${dirMap.get(direction)}Nav`}
          className={classNames[`pan${capitalize(dirMap.get(direction))}`]}
          onClick={(evt) => this.panReel(direction, evt)}
        >
          <i
            className={classes(
              'material-icons',
            )}
          >
            {`chevron_${dirMap.get(direction)}`}
          </i>
        </div>
      </div>
    );
  }

  renderThumbs = (thumbs = []) => !isEmpty(thumbs) && thumbs.map(({ secure_url }, index) => (
    <ImageThumbnail
      key={Math.random()}
      // horizontalTranslation={this.state.imageReelShift || 0}
      thumbRef={!index
        ? (thumbEl) => { this.thumbEl = thumbEl; }
        : null
      }
      thumbSource={secure_url}
    />
  ));

  render() {
    const { classNames } = this.props;
    const { imageReelShift, thumbs } = this.state;
    const { NEXT, PREV } = this.DIRS;

    const withNavArrows = size(thumbs) > 2;

    return (
      <output
        className={classNames.imageReel}
        htmlFor="file-upload-btn"
        name="photos"
        style={{
          height: isEmpty(thumbs)
            ? '4em' // Reduce `height` for empty content box
            : null, // Fallback to value set in JSS style declaration
        }}
      >
        <div
          className={classNames.offsetWrapper}
          style={{
            justifyContent: !!thumbs && !withNavArrows
              ? 'flex-start'
              : 'space-around',
          }}
        >
          {!!withNavArrows && this.renderReelNavigation(PREV, size(thumbs))}
          <div
            className={classes(
              classNames.reelContainer,
              isEmpty(thumbs) && classNames.reelWithFallbackMessage,
            )}
            ref={(imageReelEl) => { this.imageReelEl = imageReelEl; }}
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
