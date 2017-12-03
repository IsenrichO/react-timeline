import path from 'path';
import DotEnv from 'dotenv-webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import Merge from 'webpack-merge';
import Webpack, {
  DefinePlugin,
  EnvironmentPlugin,
  HotModuleReplacementPlugin,
  IgnorePlugin,
  LoaderOptionsPlugin,
  optimize,
} from 'webpack';

// PWA Manifest Webpack Plugins:
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import PwaManifestPlugin from 'webpack-pwa-manifest';
import WebappManifestPlugin, { FAVICON_PLUGIN } from 'webapp-manifest-plugin';
import WebpackManifestPlugin from 'webpack-manifest-plugin';

// Webpack Plugins:
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import BrotliCompressionPlugin from 'brotli-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import ZopfliPlugin from 'zopfli-webpack-plugin';

// PostCSS Post-Processor Configuration:
import PostCSS from './postcss.config';

const PROC_ENV = require('./config/load-env')({
  NODE_ENV: process.env.NODE_ENV || 'development',
});

/* CONSTANTS */
const isProdEnv = (process.env.NODE_ENV === 'production');
console.info(`Node Environment:\t${process.env.NODE_ENV}`);

const hmrScriptEntry = 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr&timeout=2000&reload=true';

const VENDOR_LIBS = [
  'aesthetic',
  'bson',
  'cloudinary',
  'cloudinary-react',
  'cloudinary_js',
  'core-js',
  'cors',
  'date-fns',
  'flow-bin',
  'history',
  'immutability-helper',
  'jquery',
  'jss',
  'lodash',
  'match-media',
  'moment',
  'moment-timezone',
  'promise',
  'prop-types',
  'react',
  'react-dom',
  'react-jss',
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

// 'react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:3000', 'webpack/hot/only-dev-server'

// patch: 'react-hot-loader/patch',
// client: 'webpack-dev-server/client?http://localhost:3000',
// hmr: 'webpack/hot/only-dev-server',

// bundle: path.resolve(__dirname, 'src/App'),
// context: path.resolve(__dirname, 'src'),

// hmr: 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&overlay=false&name=hmr&reload=true',
const HOT_MIDDLEWARE_SCRIPT = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=4000&reload=true';

const PWA_MANIFEST_DATA = { /* eslint-disable camelcase */
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
    url: 'http://localhost:3000/',
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
}; /* eslint-enable camelcase */

const BASE_CONFIG = (env, argv) => ({
  bail: true,
  cache: true,
  context: __dirname,
  devtool: !!isProdEnv
    ? 'source-map'
    : 'eval',
  entry: {
    bundle: [
      path.resolve(__dirname, 'src/HMR'),
      HOT_MIDDLEWARE_SCRIPT,
    ],
    polyfills: [
      'babel-polyfill',
      require.resolve('./config/polyfills'),
      HOT_MIDDLEWARE_SCRIPT,
    ],
    vendor: VENDOR_LIBS,
  },
  module: {
    rules: [{
      exclude: /(node_modules|bower_components)/,
      include: path.resolve(__dirname, 'src'),
      loader: 'babel', // Rather than the `use` key, `loader` is required in conjunction with `query`
      query: {
        cacheDirectory: !!isProdEnv,
      },
      test: /\.jsx?$/i,
    }, {
      test: /\.css$/i,
      use: ExtractTextPlugin.extract({
        fallback: 'style',
        use: 'css',
      }),
    }, {
      test: /\.(scss|sass)$/i,
      use: ExtractTextPlugin.extract({
        fallback: 'style',
        use: [
          {
            loader: 'css',
            options: {
              minimize: true,
              url: false,
            },
          },
          'postcss',
          'sass?outputStyle=expanded',
        ],
      }),
    }, {
      test: /\.json$/i,
      use: 'json',
    }, {
      test: /\.ico$/i,
      use: 'file',
    }, {
      include: path.join(__dirname, 'assets', 'images'),
      test: /\.(bmp|gif|jpe?g|png|svg|ttif)$/i,
      use: [
        // {
        //   loader: 'url',
        //   options: { limit: 3000 },
        // },
        'file?name=assets/images/[name].[ext]',
        'image-webpack',
      ],
    }, {
      test: /\.(pdf|doc[mstx]?|ppt[mstx]?|od[fpst])$/i,
      use: 'file?name=/docs/[name].[ext]',
    }],
  },
  node: {
    console: false,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  output: {
    chunkFilename: '[id].[hash].js',
    // Point sourcemap entries to original disk location:
    devtoolModuleFilenameTemplate(info) {
      return path.resolve(info.absoluteResourcePath);
    },
    filename: '[name].[hash].js',
    hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
    hotUpdateMainFilename: 'hot/[hash].hot-update.json',
    jsonpFunction: 'webpackJsonp',
    path: path.join(__dirname, 'build'), // NOTE: `__dirname === root`
    pathinfo: !isProdEnv,
    publicPath: '/', // Server-Relative
  },
  performance: {
    hints: 'warning',
  },
  plugins: [
    new optimize.OccurrenceOrderPlugin(),
    new CleanWebpackPlugin(['build/*', 'dist'], {
      allowExternal: false,
      dry: false,
      root: path.resolve(__dirname),
      verbose: true,
      watch: false,
    }),
    new HotModuleReplacementPlugin(),
    /**
     * Moment.js is an extremely popular library that bundles large locale files by default due to how Webpack
     * interprets its code. This is a practical solution that requires the user to opt into importing specific locales.
     * Refer to <https://github.com/jmblog/how-to-optimize-momentjs-with-webpack>
     */
    new IgnorePlugin(/^\.\/locale$/, /moment$/),
    new LodashModuleReplacementPlugin({
      caching: true,
      chaining: true,
      cloning: true,
      collections: true,
      currying: true,
      flattening: true,
      memoizing: true,
      paths: true,
    }),

    new DefinePlugin(PROC_ENV),

    // Must follow DotEnv plugin (if used) to prevent `NODE_ENV` being overwritten:
    new EnvironmentPlugin([
      'CLOUD_NAME',
      'GMAPS_STATIC_KEY',
      'NODE_ENV',
      'PORT',
    ]),
    // new EnvironmentPlugin({
    //   DEBUG: true,
    //   NODE_ENV: !!isProdEnv
    //     ? 'production'
    //     : 'development', // Use 'development' unless `process.env.NODE_ENV` is defined
    // }),

    new LoaderOptionsPlugin({
      debug: false,
      minimize: true,
      options: {
        context: __dirname,
        postcss: { PostCSS },
      },
    }),

    // Extract CSS chunks:
    new ExtractTextPlugin('styles.css'),

    new optimize.CommonsChunkPlugin({
      // This prevents stylesheet resources with the .css or .scss extension
      // from being moved from their original chunk to the vendor chunk
      minChunks(module, count) {
        if (module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
          return false;
        }
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
      name: 'vendor',
    }),
    new optimize.CommonsChunkPlugin({
      minChunks: Number.POSITIVE_INFINITY,
      name: 'manifest',
    }),

    // Enable minification and uglification of bundle:
    new UglifyJsPlugin({
      extractComments: true,
      parallel: true,
      test: /\.jsx?$/i,
      uglifyOptions: {
        compress: {
          dead_code: true,
          drop_console: true,
          drop_debugger: true,
          ecma: 6,
          unsafe: false,
          unused: true,
          warnings: false, // Suppress uglification warnings
        },
        ecma: 8,
        ie8: false,
        output: {
          beautify: false,
          comments: false,
          keep_quoted_props: true,
          quote_style: 3,
          semicolons: true,
          shebang: true,
          webkit: true,
        },
        parse: {
          bare_returns: false,
          ecma: 8,
          html5_comments: true,
          shebang: true,
        },
        // sourcemap: true,
        warnings: false,
      },
    }),

    // A plugin for a more aggressive chunk merging strategy:
    new optimize.AggressiveMergingPlugin(),

    // Compress assets into .gz files, so that our Koa static handler can
    // serve those instead of the full-sized version:
    new ZopfliPlugin({
      algorithm: 'zopfli',
      minRatio: 0.99,
    }),

    // Compress static assets to their GZipped `*.gz` equivalents, so that our Express instance can instead
    // serve those static assets preferentially to their full-sized ones:
    new CompressionPlugin({
      algorithm: 'gzip',
      asset: '[path].br[query]',
      deleteOriginalAssets: false,
      filename(asset) { return asset; },
      minRatio: 0.80,
      test: /\.jsx?$|\.css$|\.html$|\.map$/i,
      threshold: 10240,
    }),

    // Enable the newer Brotli compression standard to generate `*.br` files. Though support isn't shared among
    // all major browsers, the more broadly supported GZip is likewise enabled as a fallback below:
    // new BrotliCompressionPlugin({
    //   asset: '[path].br[query]',
    //   deleteOriginalAssets: true,
    //   minRatio: 0.80,
    //   test: /\.js$|\.css$|\.html$|\.map$/i,
    //   threshold: 10240,
    // }),

    new FaviconsWebpackPlugin({
      background: 'transparent',
      emitStats: false,
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        windows: false,
        yandex: false,
      },
      inject: true,
      logo: path.resolve(__dirname, 'assets/images/rt-logo.svg'),
      persistentCache: true,
      prefix: 'images/favicons-[hash]/',
      statsFilename: 'iconStats-[hash].json',
      title: 'React-Timeline Logo',
    }),
    new WebappManifestPlugin({
      ...PWA_MANIFEST_DATA,
      icons: FAVICON_PLUGIN,
    }),

    // Erect the templated root `index.html` file from the referenced skeleton view:
    new HTMLWebpackPlugin({
      chunksSortMode: 'dependency',
      favicon: path.resolve(__dirname, 'assets/images/favicon.ico'),
      filename: 'index.html', // output (relative to `output.path`)
      hash: false,
      inject: 'body',
      showErrors: !isProdEnv,
      template: path.resolve(__dirname, 'views/index.html'),
      title: 'Home | React-Timeline',
      xhtml: true,
    }),
  ],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
    extensions: ['.coffee', '.css', '.js', '.json', '.jsx', '.vue', '.web.js', '.webpack.js'],
    // modulesDirectories: ['bower_components', 'node_modules', 'shared', 'web_modules'],
    plugins: [],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  target: 'web',
});

export const DEV_SERVER = {
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
    publicPath: '', // '/assets/',
  },
  plugins: [
    // new Webpack.BannerPlugin({
    //   banner: `
    //     chunkHash:\t[chunkhash],
    //     file:\t[file]
    //     fileBase:\t[filebase],
    //     hash:\t[hash],
    //     name:\t[name],
    //     query:\t[query],
    //   `,
    //   entryOnly: false,
    //   raw: false,
    // }),
    // new BundleAnalyzerPlugin({
    //   analyzerHost: '127.0.0.1',
    //   analyzerMode: 'server',
    //   analyzerPort: 8888,
    //   defaultSizes: 'parsed',
    //   generateStatsFile: true,
    //   logLevel: 'info',
    //   statsFilename: 'bundle-stats.json',
    // }),
    new HotModuleReplacementPlugin(),
    // new Webpack.NamedModulesPlugin(),
  ],
  stats: {
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
  },
};

// const AGGREGATE_CONFIG = isProdEnv
//   ? BASE_CONFIG
//   : Merge(BASE_CONFIG, DEV_SERVER);

export default BASE_CONFIG;
