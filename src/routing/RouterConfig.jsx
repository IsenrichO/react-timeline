import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'aesthetic';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { StoreWithMiddleware as Store } from '../store/configureStore';
import Routes from './Routes';

export default (
  <Provider store={Store}>
    <Router>
      <ThemeProvider name="base">
        <MuiThemeProvider>
          <div>{Routes}</div>
        </MuiThemeProvider>
      </ThemeProvider>
    </Router>
  </Provider>
);
