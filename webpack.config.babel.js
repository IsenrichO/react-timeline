import path from 'path';
import DotEnv from 'dotenv-webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import Merge from 'webpack-merge';
import Webpack, {
  EnvironmentPlugin,
  HotModuleReplacementPlugin,
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
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

// PostCSS Post-Processor Configuration:
import PostCSS from './postcss.config';

/* CONSTANTS */
const isProdEnv = (process.env.NODE_ENV === 'production');
console.info(`Node Environment:\t${process.env.NODE_ENV}`);

const hmrScriptEntry = 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr&timeout=2000&reload=true';
// __webpack_hmr

const VENDOR_LIBS = [
  'body-parser',
  'bson',
  'cloudinary',
  'cloudinary-react',
  'cloudinary_js',
  'jquery',
  'lodash',
  'react',
  'react-dom',
  'react-motion',
  'react-redux',
  'react-router-dom',
  'react-router-redux',
  'redux',
  'redux-thunk',
  'uuid',
];

// 'react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:3000', 'webpack/hot/only-dev-server'

// patch: 'react-hot-loader/patch',
// client: 'webpack-dev-server/client?http://localhost:3000',
// hmr: 'webpack/hot/only-dev-server',

// bundle: path.resolve(__dirname, 'src/App'),
// context: path.resolve(__dirname, 'src'),


const PwaManifestData = { /* eslint-disable camelcase */
  background_color: '#F6F8FB',
  description: 'Construct beautiful layouts to catalog and record import points in your life!',
  dir: 'ltr',
  display: 'standalone',
  icons: [],
  lang: 'en-US',
  name: 'React Timeline - Web-Based Timeline Visualizer',
  orientation: 'portrait-primary',
  prefer_related_applications: false,
  related_applications: [],
  scope: '.',
  short_name: 'React Timeline',
  start_url: '.',
  theme_color: '#B15B5B',
}; /* eslint-enable camelcase */

const BASE_CONFIG = {
  cache: true,
  context: __dirname,
  devtool: 'eval-source-map', // `cheap-${isProdEnv ? '' : 'module'}-source-map`,
  entry: {
    bundle: path.resolve(__dirname, 'src/HMR'),
    hmr: 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&overlay=false&name=hmr&reload=true',
    polyfills: [
      'babel-polyfill',
      require.resolve('./config/polyfills'),
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
        //   options: { limit: 40000 }
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
    filename: '[name].[hash].js',
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json',
    path: path.join(__dirname, 'build'), // `__dirname === root`
    publicPath: '/', // Server-Relative
  },
  performance: {
    hints: 'warning',
  },
  plugins: [
    new CleanWebpackPlugin(['build', 'dist'], {
      allowExternal: false,
      dry: false,
      root: path.resolve(__dirname),
      verbose: true,
      watch: false,
    }),
    new HotModuleReplacementPlugin(),
    new CompressionPlugin({
      algorithm: 'gzip',
      deleteOriginalAssets: false,
      filename(asset) { return asset; },
      minRatio: 0.90,
      test: /\.(s?css|gif|jpe?g|jsx?|png|svg)$/i,
      threshold: 0,
    }),
    // Configure and read in local environment variables:
    new DotEnv({
      path: './.env',
      safe: false,
      silent: false,
      systemvars: false,
    }),
    new ExtractTextPlugin('styles.css'),
    // new WebpackManifestPlugin({
    //   basePath: '',
    //   fileName: 'manifest.json',
    //   publicPath: '/',
    //   seed: {
    //     ...PwaManifestData,

    //   },
    //   writeToFileEmit: false,
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
      ...PwaManifestData,
      icons: FAVICON_PLUGIN,
    }),

    // new PwaManifestPlugin({
    //   ...PwaManifestData,
    //   filename: 'manifest.json',
    //   fingerprints: false,
    //   inject: true,
    //   publicPath: '/',
    // }),

    // background_color: '#ffffff',
    // description: 'My awesome Progressive Web App!',
    // name: 'My Progressive Web App',
    // short_name: 'MyPWA',
    // icons: [{
    //   sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
    //   src: path.resolve('src/assets/icon.png'),
    // }, {
    //   size: '1024x1024', // you can also use the specifications pattern
    //   src: path.resolve('src/assets/large-icon.png'),
    // }],
    new HTMLWebpackPlugin({
      favicon: path.resolve(__dirname, 'assets/images/favicon.ico'),
      filename: 'index.html', // output (relative to `output.path`)
      inject: 'body',
      showErrors: false,
      template: path.resolve(__dirname, 'assets/index.html'),
      title: 'Home | React-Timeline',
      xhtml: true,
    }),
    // new UglifyJSPlugin({
    //   extractComments: true,
    //   parallel: true,
    //   test: /\.jsx?$/i,
    //   uglifyOptions: {
    //     compress: {
    //       arrows: true,
    //       conditionals: true,
    //       dead_code: true,
    //       ecma: 8,
    //       global_defs: {
    //         '@alert': 'console.log',
    //       },
    //       hoist_vars: false, // Setting to `true` increases output size
    //       keep_fargs: true,
    //       keep_fnames: true,
    //       keep_infinity: true,
    //       warnings: false,
    //     },
    //     ecma: 8,
    //     ie8: true,
    //     mangle: true,
    //     output: {
    //       beautify: false,
    //       comments: false,
    //     },
    //     parse: {
    //       ecma: 8,
    //       html5_comments: true,
    //       shebang: true,
    //     },
    //     toplevel: false,
    //   },
    // }),
    // Must follow DotEnv to prevent `NODE_ENV` being overwritten:
    new EnvironmentPlugin({
      DEBUG: true,
      NODE_ENV: 'development', // Use 'development' unless `process.env.NODE_ENV` is defined
    }),
    new LoaderOptionsPlugin({
      debug: false,
      minimize: true,
      options: {
        context: __dirname,
        postcss: { PostCSS },
      },
    }),
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
  ],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
    extensions: ['.css', '.js', '.json', '.jsx'],
    plugins: [],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  target: 'web',
};

const DEV_SERVER = {
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

export default BASE_CONFIG; // AGGREGATE_CONFIG;

//     new Webpack.optimize.DedupePlugin(),
//     new Webpack.optimize.UglifyJsPlugin({
//       compress: { warnings: false },
//       output: { comments: false },
//       sourceMap: false
//     })

// resolve: {
//   alias:
// }
