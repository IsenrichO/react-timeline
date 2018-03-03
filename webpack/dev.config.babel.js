import dedent                                                           from 'dedent';
import path                                                             from 'path';

// Webpack Plugins:
import { BannerPlugin, HotModuleReplacementPlugin, NamedModulesPlugin } from 'webpack';
import WebpackNotifier                                                  from 'webpack-notifier';
import { BundleAnalyzerPlugin }                                         from 'webpack-bundle-analyzer';

// Shared Resources:
import { invokeLoader, pathValidator, STATS_MODE }                     from './common';

pathValidator('**/images/favicons-*');

/* DEVELOPMENT ENVIRONMENT CONFIGURATION SETTINGS */
export const STATS_CONFIG_OPTS = {
  assets: true,
  children: false,
  chunks: false,
  colors: {
    bold: '\u001b[1m',
    cyan: '\u001b[1m\u001b[36m',
    green: '\u001b[1m\u001b[32m',
    magenta: '\u001b[1m\u001b[35m',
    red: '\u001b[1m\u001b[31m',
    yellow: '\u001b[1m\u001b[33m',
  },
  errorDetails: true,
  hash: false,
  modules: false,
  publicPath: false,
  reasons: true,
  timings: true,
  version: false,
  warnings: true,
};

const bundleAnalysisPlugins = [
  new BundleAnalyzerPlugin({
    analyzerHost: '127.0.0.1',
    analyzerMode: 'server', // <'disabled' | 'server' | 'static'>
    analyzerPort: 8888,
    defaultSizes: 'gzip', // <'stats' | 'parsed' | 'gzip'>
    logLevel: 'info', // <`error` | `info` | `silent` | `warn`>
    openAnalyzer: true,
    statsOptions: null,
  }),

  new BannerPlugin({
    banner: dedent(`
      chunkHash:\t[chunkhash],
      file:\t[file]
      fileBase:\t[filebase],
      hash:\t[hash],
      name:\t[name],
      query:\t[query],
    `),
    entryOnly: true, // Only add banner to entry chunks
    exclude: /bower_components|node_modules/,
    raw: false, // Keep banner wrapped within a comment
  }),
];

const devConfigPlugins = [
  /**
   * The below is the Webpack plugin counterpart to the `--hot` CLI flag (or, alternatively, to the
   * configuration option `{ hot: true }` that `webpack-dev-server` accepts). This plugin enables
   * Hot Module Replacement mode, otherwise known as HMR. It should never be used in production.
   */
  new HotModuleReplacementPlugin(),

  /**
   * Invoke the `NamedModulesPlugin` in conjunction with that above to ensure modules' relative
   * paths are displayed while HMR is enabled. Moreover, its use is supremely important for the
   * fact that it allows making `vendor.[hash].js` fully static, since it uses the names of module
   * files instead of those of the dynamically generated files during bundling (meaning static
   * references to vendor source code are maintained while hashes continue to be regenerated).
   */
  new NamedModulesPlugin(),

  /**
   * This is a webpack plugin that uses the `node-notifier` package to display build status system
   * notifications to the user. The plugin will notify you about the first run (success/fail), all
   * failed runs and the first successful run after recovering from a build failure. In other words,
   * it will stay silent if everything is fine with your build.
   */
  new WebpackNotifier({
    alwaysNotify: true,
    contentImage: path.resolve(__dirname, './assets/favicon.ico'),
    excludeWarnings: false,
    skipFirstNotification: false,
    title: 'React-Timeline Webpack Build',
  }),

  // Spread in the bundle stats plugins if in `STATS_MODE`:
  ...(!!STATS_MODE ? bundleAnalysisPlugins : []),
];

const DEV_CONFIG = {
  module: {
    rules: [{
      test: /\.css$/i,
      use: [
        invokeLoader('style', { sourceMap: true }),
        invokeLoader('css'),
      ],
    }, {
      test: /\.less$/i,
      use: [
        invokeLoader('style', { sourceMap: true }),
        invokeLoader('css'),
        invokeLoader('less', { sourceMap: true }),
      ],
    }, {
      test: /\.s(a|c)ss$/i,
      use: [
        invokeLoader('style', { sourceMap: true }),
        invokeLoader('css'),
        invokeLoader('postcss', { sourceMap: true }), // Set to `inline` to include as an annotation comment
        invokeLoader('sass', {
          outputStyle: 'expanded',
          sourceMap: true,
          sourceMapContents: true,
        }),
      ],
    }],
  },
  parallelism: 1,
  performance: {
    hints: 'warning',
  },
  plugins: devConfigPlugins,
  profile: true,
  stats: STATS_CONFIG_OPTS,
};

/* DEFAULT EXPORT */
export default DEV_CONFIG;
