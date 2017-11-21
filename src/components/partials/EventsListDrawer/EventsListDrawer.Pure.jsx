// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import NavigationCloseGlyph from 'material-ui/svg-icons/navigation/close';
import SelectableList from '../../../HOCs/SelectableList';
import { aesthetic } from '../../../style/styler';
import { tlEventPropTypes } from '../../../util/TypeChecking';

type Props = {
  eventId: string,
  isDrawerOpen?: boolean,
  theme?: string,
};

export default class EventsListDrawerPure extends Component<Props> {
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
      eventId,
      isDrawerOpen,
      handleDrawerClose,
      handleDrawerToggle,
      selectedEventData,
    } = this.props;
    const { isDrawerDocked } = this.state;

    return (
      <Drawer
        className={classNames.eventsListDrawerRootContainer}
        containerClassName={classNames.eventsListDrawerContainer}
        docked={isDrawerDocked}
        onRequestChange={(open, reason) => handleDrawerToggle(open, reason)}
        open={isDrawerOpen}
        overlayClassName={classNames.eventsListDrawerOverlay}
        swipeAreaWidth={75}
        width="35%"
        zDepth={4}
      >
        <AppBar
          className={classNames.eventsListDrawerHeaderBar}
          iconElementRight={
            <IconButton
              className={classNames.eventsListDrawerCloseButton}
              onClick={handleDrawerClose}
            >
              <NavigationCloseGlyph />
            </IconButton>
          }
          showMenuIconButton={false}
          title="Your Events"
          zDepth={1}
        />
        <SelectableList
          defaultValue={eventId}
          eventData={eventData}
          selectedEventData={selectedEventData}
        />
      </Drawer>
    );
  }
}
