// @flow
import React, { Component }       from 'react';
import PropTypes                  from 'prop-types';
import { ClassNamesPropType }     from 'aesthetic';
import AppBar                     from 'material-ui/AppBar';
import Drawer                     from 'material-ui/Drawer';
import IconButton                 from 'material-ui/IconButton';
import { Backdrop, ModalManager } from 'material-ui/Modal';
import Toolbar                    from 'material-ui/Toolbar';
import Tooltip                    from 'material-ui/Tooltip';
import Typography                 from 'material-ui/Typography';
import NavigationCloseGlyph       from 'material-ui-icons/Close';
import SelectableList             from '~/HOCs/SelectableList';
import { aesthetic }              from '~/style/styler';
import { tlEventPropTypes }       from '~/util/TypeChecking';

/* FLOW TYPES */
type Props = {
  eventId: string,
  isDrawerOpen?: boolean,
  theme?: string,
};

type State = {
  isDrawerDocked: boolean,
};

export default class EventsListDrawerPure extends Component<Props, State> {
  static displayName = 'EventsListDrawer';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    eventData: PropTypes.objectOf(tlEventPropTypes).isRequired,
    eventId: PropTypes.string.isRequired,
    handleDrawerClose: PropTypes.func.isRequired,
    handleDrawerToggle: PropTypes.func.isRequired,
    isDrawerOpen: PropTypes.bool,
    selectedEventData: tlEventPropTypes.isRequired,
    theme: PropTypes.string,
  };

  static defaultProps = {
    isDrawerOpen: false,
    theme: 'base',
  };

  constructor(props) {
    super(props);
    const { theme } = props;

    this.state = {
      isDrawerDocked: true,
    };

    this.theme = aesthetic.themes[theme];
  }

  render() {
    const {
      classNames,
      eventData,
      isDrawerOpen,
      handleDrawerClose,
      handleDrawerToggle,
      selectedEventData,
    } = this.props;
    const drawerExitIconId = 'events-drawer-exit-icon';

    return (
      <Drawer
        anchor="left"
        className={classNames.eventsListDrawerRootContainer}
        elevation={10}
        ModalProps={{
          BackdropComponent: Backdrop,
          manager: new ModalManager(),
          onBackdropClick: handleDrawerClose,
          onEscapeKeyDown: handleDrawerClose,
          open: !!isDrawerOpen,
        }}
        open={!!isDrawerOpen}
        type="temporary"
      >
        <AppBar
          className={classNames.eventsListDrawerHeaderBar}
          position="static"
        >
          <Toolbar>
            <Typography
              noWrap
              align="left"
              className={classNames.eventsListDrawerTypography}
              type="headline"
            >
              Your Events
            </Typography>

            <Tooltip
              enterDelay={350}
              id={drawerExitIconId}
              placement="left-start"
              title={<span className={classNames.eventsListDrawerTooltip}>Close</span>}
            >
              <IconButton
                aria-describedby={drawerExitIconId}
                aria-label="Close"
                className={classNames.eventsListDrawerCloseButton}
                onClick={handleDrawerClose}
              >
                <NavigationCloseGlyph
                  fontSize
                  titleAccess="Close"
                />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        <SelectableList
          data={eventData}
          selectedEventData={selectedEventData}
        />
      </Drawer>
    );
  }
}
