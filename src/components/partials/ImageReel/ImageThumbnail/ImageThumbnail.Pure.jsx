import React from 'react';
import PropTypes from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';
import { isNil, isNumber } from 'lodash';
import IconButton from 'material-ui/IconButton';
import SelectionCircleIcon from 'material-ui/svg-icons/image/panorama-fish-eye';
import SelectedItemIcon from 'material-ui/svg-icons/av/fiber-manual-record';
import RemoveIcon from 'material-ui/svg-icons/navigation/cancel';
import { aesthetic } from '../../../../style/styler';

const ImageThumbnailPure = ({
  bytes,
  classNames,
  horizontalTranslation,
  imageRemovalHandler,
  imageSelectionHandler,
  isSelected,
  size,
  theme,
  thumbRef,
  thumbSource,
}) => {
  const { colors, keywords } = aesthetic.themes[theme || 'base'];

  return (
    <div
      ref={!isNil(thumbRef) ? thumbRef : null}
      className={classNames.thumbWrapper}
      style={{
        transform: `translateX(${horizontalTranslation}px)`,
        transition: `${keywords.all} 500ms ease`,
      }}
    >
      <div className={classNames.thumbnailActionsBar}>
        <IconButton
          className={classes(
            'material-icons',
            classNames.bckgSelectOption,
            classNames.thumbnailActionIcon,
            !!isSelected && classNames.selectedThumb,
          )}
          onClick={(evt) => imageSelectionHandler(thumbSource)}
          tooltip={<span className={classNames.thumbnailTooltip}>Set Cover Image</span>}
          tooltipPosition="bottom-right"
          tooltipStyles={{
            left: '10%',
            top: '75%',
          }}
        >
          {!!isSelected
            ? (<SelectedItemIcon color={colors.white.pure} />)
            : (<SelectionCircleIcon color={colors.white.pure} />)
          }
        </IconButton>
        <IconButton
          className={classes(
            'material-icons',
            classNames.removeThumbButton,
            classNames.thumbnailActionIcon,
          )}
          onClick={imageRemovalHandler}
          tooltip={<span className={classNames.thumbnailTooltip}>Remove Image</span>}
          tooltipPosition="bottom-left"
          tooltipStyles={{
            right: '10%',
            top: '75%',
          }}
        >
          <RemoveIcon color={colors.white.pure} />
        </IconButton>
      </div>
      <div
        className={classNames.thumb}
        style={{
          backgroundImage: `url("${thumbSource}")`,
          backgroundSize: (isNumber(size) && (+size < 10000)) || (isNumber(bytes) && (+bytes < 10000))
            ? 'contain'
            : null,
        }}
      />
    </div>
  );
};

ImageThumbnailPure.displayName = 'ImageThumbnail';

ImageThumbnailPure.propTypes = {
  bytes: PropTypes.number,
  classNames: ClassNamesPropType.isRequired,
  horizontalTranslation: PropTypes.number,
  imageRemovalHandler: PropTypes.func,
  imageSelectionHandler: PropTypes.func,
  isSelected: PropTypes.bool,
  size: PropTypes.number,
  theme: PropTypes.string,
  thumbRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.oneOf([null]),
  ]),
  thumbSource: PropTypes.string,
};

ImageThumbnailPure.defaultProps = {
  bytes: 0,
  horizontalTranslation: 0,
  imageRemovalHandler: Function.prototype,
  imageSelectionHandler: Function.prototype,
  isSelected: false,
  size: null,
  theme: 'base',
  thumbRef: null,
  thumbSource: '',
};

export default ImageThumbnailPure;
