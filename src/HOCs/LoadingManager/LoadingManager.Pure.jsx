import React from 'react';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';

const LoadingManager = (config = {}) => (target, key, descriptor) => {
  // Store the original render method on the target:
  target.renderOnLoad = target.renderOnLoad || descriptor.value;
  descriptor.value = function() {
    // Bind `this` so the `render` function can access the original state:
    const render = ::target.renderOnLoad;

    const { isLoading, isReloading } = this.state;
    const contents = isLoading ? null : render();

    return (
      <LoadingWrapper
        isLoading={isLoading}
        isReloading={isReloading}
        {...config}
      >
        {contents}
      </LoadingWrapper>
    );
  };

  return descriptor;
};

export default LoadingManager;
