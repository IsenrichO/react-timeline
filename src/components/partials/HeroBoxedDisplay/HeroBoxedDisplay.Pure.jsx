import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';
import MissingPhotoPlaceholderGlyph from '../../../../assets/images/no-photo-placeholder.svg';

export default class HeroBoxedDisplayPure extends Component {
  static displayName = 'HeroBoxedDisplay';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    eventName: PropTypes.string,
  };

  static defaultProps = {
    eventName: '',
  };

  render() {
    const { classNames, eventName } = this.props;

    return (
      <div className={classNames.boxedDisplayContainer}>
        <div
          className={classNames.boxedDisplayHeroContainer}
          style={{
            backgroundImage: `url("${MissingPhotoPlaceholderGlyph}")`,
          }}
        />
        <header className={classNames.boxedDisplayHeader}>
          <h1 className={classNames.eventTitle}>{eventName}</h1>
        </header>
      </div>
    );
  }
}
