import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';
// import RouterConfig from './routing/RouterConfig';

const render = (Component) => {
  // The `AppContainer` import is a necessary wrapper component for HMR:
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);

// Webpack Hot Module Replacement API:
if (module.hot) {
  // NOTE: Providing the `App` component path as the first parameter to `accept`
  // causes the DOM re-render to fail:
  module.hot.accept(
    '../src/HMR',
    () => render(App),
  );
}
