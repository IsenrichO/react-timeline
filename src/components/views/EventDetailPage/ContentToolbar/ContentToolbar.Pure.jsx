// @flow
import React, { Component }            from 'react';
import PropTypes                       from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';
import { castArray, isObjectLike }     from 'lodash';
import IterableMediaMap                from './DnD/MediaCards';
import MediaCard                       from './ContentDragSource';
import { nullable}                     from '~/util/TypeChecking';

// Import CSS Keyframe Animation:
import '~/style/animations/dropIn.css';

type Props = {
  theme?: string,
};

export default class ContentToolbarPure extends Component<Props> {
  static displayName = 'ContentToolbarCardPanel';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    passedClasses: nullable(
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.objectOf(PropTypes.string),
      PropTypes.string,
    ),
    theme: PropTypes.string,
  };

  static defaultProps = {
    passedClasses: null,
    theme: 'base',
  };

  constructor(props) {
    super(props);
  }

  /**
   * The `renderMediaCards` function operates over the `IterableMediaMap`... an ES6 Map object. By
   * calling its `Map#entries` method, we are given an Iterator object, over which is then iterated.
   * For each iteratee, a unique `MediaCardThumbnail` component is generated if the `isEnabled`
   * property destructured off the iterable is truthy. These components are pushed onto an array in
   * serial, the latter of which is returned with the conclusion of the last iteration.
   * @return {Array}    An array of `<MediaCardThumbnail />` components
   */
  renderMediaCards() {
    const mapItems = [];

    for (const [mediaType, {
      isEnabled = true,
      properties,
      ...props
    }] of IterableMediaMap.entries()) {
      mapItems.push(
        <MediaCard
          {...props}
          key={`${mediaType}MediaCardThumbnail`}
          isDisabled={!isEnabled}
          mediaType={mediaType}
          properties={properties}
        />,
      );
    }

    return mapItems;
  }

  render() {
    const { classNames, passedClasses } = this.props;

    return (
      <ul
        className={classes(
          classNames.contentToolbarContainer,
          classNames[passedClasses],
          // ...(isObjectLike(passedClasses) ? passedClasses : castArray(passedClasses)),
        )}
      >
        {this.renderMediaCards()}
      </ul>
    );
  }
}
