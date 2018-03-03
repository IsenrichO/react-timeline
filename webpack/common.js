import fs   from 'fs-extra';
import glob from 'glob';
import path from 'path';

/* HELPERS */
export const cssLoaderOpts = (extraConfigOpts = {}) => ({
  importLoaders: 1,
  localIdentName: '[sha1:hash:hex:7]',
  minimize: !!isProdEnv,
  modules: !!isProdEnv,
  sourceMap: !isProdEnv,
  ...(Object(extraConfigOpts) === extraConfigOpts ? extraConfigOpts : null),
});

export const invokeLoader = (
  loader = '',
  options = cssLoaderOpts(),
  otherLoaderFields = {},
) => ({ loader, options, ...otherLoaderFields });

export const isCliFlag = (flag) => Array
  .from(process.argv)
  .includes(String(flag));

export const isVendor = ({ resource }) => (/node_modules/).test(resource);
export const resolve = (...args) => path.resolve(process.cwd(), ...args);

export const pathValidator = (pathToCheck = process.cwd(), func = Function.prototype, callIfNonexistent = false) => {
  const doesPathExist = fs.existsSync(pathToCheck);
  const fileSeeker = glob.sync(pathToCheck, {
    debug: !!DEBUG_MODE,
    nocase: false,
    root: process.cwd(),
    stat: !!STATS_MODE,
  });

  return (!!callIfNonexistent && !doesPathExist) || (!callIfNonexistent && doesPathExist)
    ? func()
    : null;
};

/* ENTRY LOGIC */
export const ENV_GLOBAL = (global || window);
export const FALLBACK_MODE = 'development';
export const DEBUG_MODE = isCliFlag('DEBUG');
export const STATS_MODE = isCliFlag('STATS');
const {
  BABEL_ENV = FALLBACK_MODE,
  NODE_ENV = FALLBACK_MODE,
} = (process.env || {});

export { BABEL_ENV, NODE_ENV };

export const PROC_ENV = require('../config/load-env')({ BABEL_ENV, DEBUG, NODE_ENV, STATS });

export const {
  CLOUD_NAME,
  DEBUG = DEBUG_MODE,
  GMAPS_STATIC_KEY,
  PORT,
  STATS = STATS_MODE,
} = (PROC_ENV || {});

export const isProdEnv = (NODE_ENV === 'production');
console.info(`Node Environment:\t${process.env.NODE_ENV}`);

/* CONSTANTS */
export const isModernBrowser = ('fetch' in ENV_GLOBAL)
  && ((typeof Promise !== 'undefined') || !!ENV_GLOBAL.Promise)
  && ('assign' in Object);

export const HOT_MIDDLEWARE_SCRIPT = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=4000&reload=true';
export const hmrScriptEntry = 'webpack-hot-middleware/client?path=https://localhost:3000/__webpack_hmr&timeout=2000&overlay=false&name=main&reload=true';
// var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
// hmr: 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&overlay=false&name=hmr&reload=true',
// const hmrScriptEntry =    'webpack-hot-middleware/client?path=https://localhost:3000/__webpack_hmr&timeout=20000&reload=true';

/* SUB-CONFIGS */
export const DEV_SERVER_CONFIG_OPTS = {
  devServer: {
    clientLogLevel: 'info',
    compress: true,
    contentBase: path.resolve(__dirname, 'build'),
    historyApiFallback: true,
    host: 'localhost',
    hot: true,
    inline: true,
    noInfo: false,
    port: 3000,
    publicPath: '/',
  },
};

export const EXTERNALS = {
  'body-parser': true,
  ejs: true,
  express: true,
  'express-static-gzip': true,
  'react/addons': true,
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true,
};

export const PWA_MANIFEST_DATA = {
  background_color: '#F6F8FB',
  description: 'Construct beautiful layouts to catalog and record import points in your life!',
  dir: 'ltr',
  display: 'standalone',
  icons: [],
  lang: 'en-US',
  name: 'React Timeline - Web-Based Timeline Visualizer',
  orientation: 'portrait-primary',
  prefer_related_applications: false,
  related_applications: [{
    platform: 'web',
    url: 'https://localhost:3000/',
  }, {
    id: 'com.example.app1',
    platform: 'play',
    url: 'https://play.google.com/store/apps/details?id=com.example.app1',
  }, {
    platform: 'itunes',
    url: 'https://itunes.apple.com/app/example-app1/id123456789',
  }],
  scope: '.',
  short_name: 'React Timeline',
  start_url: '.',
  theme_color: '#B15B5B',
};

export const VENDOR_LIBS = [
  'aesthetic',
  'bson',
  'cloudinary',
  'cloudinary-react',
  'cloudinary_js',
  'core-js',
  'cors',
  'date-fns',
  'draft-convert',
  'flow-bin',
  'history',
  'immutability-helper',
  'jquery',
  'jss',
  'lodash',
  'match-media',
  'material-ui',
  'material-ui-chip-input',
  'medium-draft',
  'moment',
  'moment-timezone',
  'promise',
  'prop-types',
  'react',
  'react-dom',
  'react-infinite-calendar',
  'react-jss', // Don't include `react-jss-theme`
  'react-motion',
  'react-redux',
  'react-router-dom',
  'react-router-redux',
  'react-transition-group',
  'recompose',
  'redux',
  'redux-form',
  'redux-thunk',
  'reselect',
  'uuid',
];

/* EXPORTS */
export const webpackConstants = {
  BABEL_ENV,
  CLOUD_NAME,
  DEBUG,
  DEBUG_MODE,
  ENV_GLOBAL,
  FALLBACK_MODE,
  GMAPS_STATIC_KEY,
  NODE_ENV,
  PORT,
  PROC_ENV,
  STATS,
  STATS_MODE,
  VENDOR_LIBS,
  hmrScriptEntry,
  isModernBrowser,
  isProdEnv,
};

export const webpackHelpers = {
  cssLoaderOpts,
  invokeLoader,
  isCliFlag,
  isVendor,
  pathValidator,
  resolve,
};

export const webpackSubconfigs = {
  DEV_SERVER_CONFIG_OPTS,
  EXTERNALS,
  PWA_MANIFEST_DATA,
};

export default {
  webpackConstants,
  webpackHelpers,
  webpackSubconfigs,
};
