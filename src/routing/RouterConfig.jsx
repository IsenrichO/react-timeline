import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { ThemeProvider } from 'aesthetic';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store, { history, StoreWithMiddleware as Store } from '../store/configureStore';
import Routes from './Routes';

/**
 * NOTE: By default, `ConnectedRouter` will use the store provisioned to `Provider`.
 * @type {Object}
 */
export default (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider name="base">
        <MuiThemeProvider>
          <Routes />
        </MuiThemeProvider>
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>
);
