// @flow
import React, { Component }            from 'react';
import PropTypes                       from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';
import { DropTarget }                  from 'react-dnd';
import uuidv4                          from 'uuid/v4';
import SvgIcon                         from 'material-ui/SvgIcon';
import AddCircleGlyph                  from 'material-ui-icons/AddCircle';
import { TEXT }                        from '../DnD/ItemTypes';
import { aesthetic }                   from '~/style/styler';
import { stylePropTypes }              from '~/util/TypeChecking';

type Props = {
  canDrop: boolean,
  didDrop: boolean,
  isOver: boolean,
  isOverCurrent: boolean,
  theme?: string,
};

/** DROP TARGET SPECIFICATION */
const DropTargetSpec = {
  canDrop({ key, uuid = uuidv4(), withCarousel = false }, monitor, component) {
    // const dragSourceIdentifier = findValidCardIdentifier(id, uuid, key);
    // const { subType = 'image' } = monitor.getItem();
    const dragSourceType = monitor.getItemType();

    // const isValidDragSource = !monitor.didDrop()
    //   && isString(dragSourceIdentifier)
    //   && !isEmpty(dragSourceIdentifier);

    return true;
    // return !!withCarousel
    //   ? isValidDragSource
    //   && ([CARD_ITEM, THUMB].includes(dragSourceType))
    //   && ['image', 'text', 'video'].includes(subType.toLowerCase())
    //   : isValidDragSource
    //   && [CARD, CARD_ITEM, THUMB].includes(dragSourceType);
  },
  // drop({
  //   addNewSequencerCard = null,
  //   cardContainer,
  //   galleryCardId,
  //   index = 0,
  //   sequencerCards,
  //   withCardItem = false,
  //   withCarousel = false,
  //   ...rest
  // }, monitor, component) {
  //   const dragSource = monitor.getItem();
  //   const dragSourceType = monitor.getItemType();
  //
  //   const { id, key, properties, subType = 'image', uuid } = dragSource;
  //   const cardIdentifier = findValidCardIdentifier(id, uuid, key);
  //
  //   // Short-circuit if an unrecognized `itemType` is the source of the drag event:
  //   if (![CARD, CARD_ITEM, THUMB].includes(dragSourceType)) return;
  //
  //   // Short-circuit if the dragged item's ID or UUID already exists:
  //   if (!isCardUnique(sequencerCards, cardIdentifier)) return;
  //
  //   // Short-circuit if the dragged item is a `THUMB` of the Gallery variety:
  //   if (!!withCardItem
  //     && (dragSourceType === THUMB)
  //     && (subType.toLowerCase() === 'carousel')
  //   ) return;
  //
  //   const baseCardData = {
  //     ...(omit(dragSource, ['classNames', 'properties', 'theme', 'type'])),
  //     key: cardIdentifier,
  //     properties: {
  //       colorTheme: 'dark',
  //       subtitle: '',
  //       ...GetCardProperties(dragSource.subType.toLowerCase()).properties,
  //       ...properties,
  //     },
  //     sourceOrigin: cardContainer,
  //     structureParent: 'threads',
  //     type: 'card',
  //     uuid: cardIdentifier,
  //     wasSetAtIndex: dragSourceType === THUMB,
  //   };
  //   const cardSource = {
  //     ...baseCardData,
  //     ...(!!id ? { id } : null),
  //   };
  //
  //   const orderedArgs = [
  //     cardSource,
  //     !!withCarousel
  //       ? galleryCardId
  //       : index,
  //     !!withCardItem
  //       ? galleryCardId
  //       : cardContainer,
  //   ];
  //
  //   // Register a new card or a modified card order in the Sequencer container:
  //   addNewSequencerCard(...orderedArgs);
  //
  //   return {
  //     cardContainer,
  //     dragSource,
  //     isGalleryCardItem: !!withCarousel,
  //     postDropDelete: true,
  //   };
  // },
  hover(props, monitor, component) {
    if (!monitor.canDrop() || monitor.didDrop()) return;
  },
};

@DropTarget([TEXT], DropTargetSpec, (connect, monitor) => ({
  canDrop: monitor.canDrop(),
  connectDropTarget: connect.dropTarget(),
  didDrop: monitor.didDrop(),
  isOver: monitor.isOver({ shallow: false }),
  isOverCurrent: monitor.isOver({ shallow: true }),
  itemType: monitor.getItemType(),
}))
export default class LayoutTemplateDropTargetPure extends Component<Props> {
  static displayName = 'LayoutTemplateDropTarget';

  static propTypes = {
    canDrop: PropTypes.bool.isRequired,
    classNames: ClassNamesPropType.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    didDrop: PropTypes.bool.isRequired,
    isOver: PropTypes.bool.isRequired,
    isOverCurrent: PropTypes.bool.isRequired,
    itemType: PropTypes.oneOf([TEXT]),
    passedClasses: PropTypes.string,
    style: stylePropTypes,
    theme: PropTypes.string,
  };

  static defaultProps = {
    itemType: TEXT,
    passedClasses: null,
    style: null,
    theme: 'base',
  };

  constructor(props) {
    super(props);
    const { theme } = props;

    this.theme = aesthetic.themes[theme];
  }

  render() {
    const {
      classNames,
      connectDropTarget,
      isOverCurrent,
      passedClasses,
      style,
      ...rest
    } = this.props;
    const { colors } = this.theme;

    return (
      connectDropTarget(
        <div
          className={classes(
            classNames.layoutDropTarget,
            !!isOverCurrent && classNames.layoutDropTargetHoverState,
            passedClasses,
          )}
          style={style}
        >
          {!!isOverCurrent && (
            <div className={classNames.addMediaEmbedIndicator}>
              <SvgIcon
                fontSize
                nativeColor={colors.white.primary}
                titleAccess="Add Content Media"
              >
                <AddCircleGlyph />
              </SvgIcon>
            </div>
          )}
        </div>,
      )
    );
  }
}
