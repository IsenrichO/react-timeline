'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR
import RouterConfig from './routing/RouterConfig';


const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(RouterConfig);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./routing/RouterConfig', () => render(RouterConfig));
}
