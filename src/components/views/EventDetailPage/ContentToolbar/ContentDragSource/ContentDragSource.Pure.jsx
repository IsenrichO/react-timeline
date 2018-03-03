// @flow
import React, { Component, isValidElement } from 'react';
import PropTypes                            from 'prop-types';
import { ClassNamesPropType }               from 'aesthetic';
import { DragSource }                       from 'react-dnd';
import uuidv4                               from 'uuid/v4';
import { get, isEmpty }                     from 'lodash';
import ErrorIcon                            from 'material-ui-icons/ErrorOutline';
import { TEXT }                             from '../DnD/ItemTypes';
import { aesthetic }                        from '~/style/styler';

type Props = {
  didDrop: boolean,
  isDisabled?: boolean,
  isDragging: boolean,
  theme?: string,
};

/* DRAG SOURCE SPECIFICATION */
const ContentDragSource = {
  beginDrag({ numCards, ...rest }, monitor, component) {
    const cardIdentifier = uuidv4();

    return {
      key: cardIdentifier,
      uuid: cardIdentifier,
      ...rest,
    };
  },
  endDrag(props, monitor) {
    // Guard against unsuccessful drop outcomes:
    if (!monitor.didDrop()) return;

    const { dragSource } = monitor.getDropResult();

    /**
     * Commented out below is an internal Redux action some users have reported
     * to use as a successful workaround for DnD issues wherein `beginDrag` events
     * were left without a corresponding `endDrag` event:
     *
     * monitor.internalMonitor.store.dispatch({ type: 'dnd-core/END_DRAG' });
     */
  },
};

@DragSource(TEXT, ContentDragSource, (connect, monitor) => ({
  connectDragPreview: connect.dragPreview(),
  connectDragSource: connect.dragSource(),
  didDrop: monitor.didDrop(),
  isDragging: monitor.isDragging(),
}))
export default class ContentDragSourcePure extends Component<Props> {
  static displayName = 'ContentDragSource';

  static contextTypes = {
    dragDropManager: PropTypes.object.isRequired
  };

  static childContextTypes = {
    dragDropManager: PropTypes.object.isRequired,
  };

  static propTypes = {
    classNames: ClassNamesPropType,
    connectDragSource: PropTypes.func.isRequired,
    didDrop: PropTypes.bool.isRequired,
    icon: PropTypes.shape({
      fa: PropTypes.string,
      material: PropTypes.func,
    }).isRequired,
    isDisabled: PropTypes.bool,
    isDragging: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    theme: PropTypes.string,
  };

  static defaultProps = {
    classNames: {},
    isDisabled: false,
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
      connectDragSource,
      didDrop,
      icon,
      isDisabled,
      isDragging,
      label,
    } = this.props;

    const { black, grey, white } = this.theme.colors;
    const hasActiveDragState = isDragging && !didDrop;
    const cardToolTip = `${label} Card`;
    const AppliedIcon = get(icon, 'material', ErrorIcon);
    const decIcon = (<AppliedIcon color={!!isDisabled ? 'disabled' : 'primary'} />);

    return (
      <li className={classNames.contentCard}>
        {connectDragSource(
        /**
         * The `<span />` wrapper visible below is necessary since the React-DnD
         * library's `connectDragSource()` method has dropped support for using
         * non-native, top-level React nodes as arguments passed to it.
         */
          <div
            aria-hidden
            aria-dropeffect={!!isDragging ? 'copy' : 'none'}
            aria-grabbed={!!isDragging}
            aria-label={cardToolTip}
            className={classNames.addCardPanelButtonCard}
            style={{
              backgroundColor: !!hasActiveDragState ? grey.granite : white.primary,
              borderColor: !!hasActiveDragState ? grey.granite : null,
              color: (!!hasActiveDragState ? grey : black).primary,
            }}
            title={cardToolTip}
          >
            {!isEmpty(AppliedIcon) // isValidElement(get(icon, 'material', (<ErrorIcon />)))
              ? decIcon
              : null
            }
            <span className={classNames.addCardPanelButtonLabel}>{label}</span>
          </div>,
          { dropEffect: 'copy' },
        )}
      </li>
    );
  }
}
