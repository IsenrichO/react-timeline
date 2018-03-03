// @flow
import React                           from 'react';
import PropTypes                       from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';
import { isNil, isNumber }             from 'lodash';
import IconButton                      from 'material-ui/IconButton';
import Tooltip                         from 'material-ui/Tooltip';
import SelectionCircleIcon             from 'material-ui-icons/PanoramaFishEye';
import SelectedItemIcon                from 'material-ui-icons/FiberManualRecord';
import RemoveIcon                      from 'material-ui-icons/Cancel';
import { aesthetic }                   from '~/style/styler';

type Props = {
  bytes?: number,
  horizontalTranslation?: number,
  isSelected?: boolean,
  size?: number,
  theme?: string,
  thumbSource?: string,
};

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
}: Props) => {
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
        <Tooltip
          className={classNames.thumbnailTooltip}
          id="set-cover-thumbnail-tooltip"
          placement="bottom-start"
          style={{
            left: '10%',
            top: '75%',
          }}
          title="Set Cover Image"
        >
          <IconButton
            className={classes(
              'material-icons',
              classNames.bckgSelectOption,
              classNames.thumbnailActionIcon,
              !!isSelected && classNames.selectedThumb,
            )}
            onClick={(evt) => imageSelectionHandler(thumbSource)}
          >
            {!!isSelected ? (
              <SelectedItemIcon
                nativeColor={colors.white.pure}
                titleAccess="Selected Thumbnail"
              />
            ) : (
              <SelectionCircleIcon
                nativeColor={colors.white.pure}
                titleAccess="Select Thumbnail"
              />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip
          className={classNames.thumbnailTooltip}
          id="remove-image-thumbnail-tooltip"
          placement="bottom-end"
          style={{
            right: '10%',
            top: '75%',
          }}
          title="Remove Image"
        >
          <IconButton
            className={classes(
              'material-icons',
              classNames.removeThumbButton,
              classNames.thumbnailActionIcon,
            )}
            onClick={imageRemovalHandler}
          >
            <RemoveIcon
              nativeColor={colors.white.pure}
              titleAccess="Remove"
            />
          </IconButton>
        </Tooltip>
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
