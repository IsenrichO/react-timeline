// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';
import IconButton from 'material-ui/IconButton';
import NavigationMenuIcon from 'material-ui/svg-icons/navigation/menu';
import MissingPhotoPlaceholderGlyph from '../../../../assets/images/no-photo-placeholder.svg';

type Props = {
  eventName?: string,
};

export default class HeroBoxedDisplayPure extends Component<Props> {
  static displayName = 'HeroBoxedDisplay';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    eventName: PropTypes.string,
    handleDrawerOpen: PropTypes.func.isRequired,
  };

  static defaultProps = {
    eventName: '',
  };

  render() {
    const { classNames, eventName, handleDrawerOpen } = this.props;

    return (
      <div className={classNames.boxedDisplayContainer}>
        <IconButton
          className={classNames.eventsDrawerToggleButton}
          onClick={handleDrawerOpen}
        >
          <NavigationMenuIcon />
        </IconButton>
        <div
          className={classNames.boxedDisplayHeroContainer}
          style={{
            backgroundImage: `url("${MissingPhotoPlaceholderGlyph}")`,
          }}
        >
          <header className={classNames.boxedDisplayHeader}>
            <h1 className={classNames.eventTitle}>{eventName}</h1>
          </header>
        </div>
      </div>
    );
  }
}
