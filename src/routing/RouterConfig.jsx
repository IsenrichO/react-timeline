import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { ThemeProvider } from 'aesthetic';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store, { history } from '../store/configureStore';
import Routes from './Routes';

/**
 * NOTE: By default, `ConnectedRouter` will use the store provisioned to `Provider`.
 * @type {Object}
 */
export default (
  <Provider store={store}>
    <ThemeProvider name="base">
      <ConnectedRouter history={history}>
        <MuiThemeProvider>
          <Routes />
        </MuiThemeProvider>
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
);
