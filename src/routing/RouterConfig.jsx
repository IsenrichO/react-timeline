import React                                       from 'react';
import { Provider }                                from 'react-redux';
import { ConnectedRouter }                         from 'react-router-redux';
import { ThemeProvider as AestheticThemeProvider } from 'aesthetic';
import { ThemeProvider as EmotionThemeProvider }   from 'emotion-theming';
import { createMuiTheme, MuiThemeProvider }        from 'material-ui/styles';
import Routes                                      from './Routes';
import store, { history }                          from '~/store/configureStore';
import BaseTheme                                   from '~/style/theming/base';
import { THEME_RED }                               from '~/style/theming/base/colors';

const theme = createMuiTheme({
  palette: {
    primary: { main: THEME_RED }, // Purple and green play nicely together.
    secondary: { main: '#11CB5F' }, // This is just green.A700 as hex.
  },
  ...BaseTheme,
});

/**
 * NOTE: By default, `ConnectedRouter` will use the store provisioned to `Provider`.
 * @type {Object}
 */
export default (
  <Provider store={store}>
    <AestheticThemeProvider name="base">
      <EmotionThemeProvider theme={BaseTheme}>
        <MuiThemeProvider theme={theme}>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </MuiThemeProvider>
      </EmotionThemeProvider>
    </AestheticThemeProvider>
  </Provider>
);
