import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import Merge from 'webpack-merge';
import Webpack, {
  DefinePlugin,
  EnvironmentPlugin,
  HotModuleReplacementPlugin,
  IgnorePlugin,
  LoaderOptionsPlugin,
  NamedModulesPlugin,
  optimize,
  ProvidePlugin,
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
import ImageMinPlugin from 'imagemin-webpack-plugin';
import ImageMinMozJpeg from 'imagemin-mozjpeg';
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

const EXTERNALS = {
  'body-parser': true,
  ejs: true,
  express: true,
  'express-static-gzip': true,
  'react/addons': true,
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true,
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
export const HOT_MIDDLEWARE_SCRIPT = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=4000&reload=true';

export const PWA_MANIFEST_DATA = { /* eslint-disable camelcase */
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

// export const BASE_CONFIG = (env, argv) => ({
export const BASE_CONFIG = {
  bail: true,
  cache: true,
  context: __dirname,
  devtool: !!isProdEnv
    ? 'cheap-module-source-map'
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
  externals: EXTERNALS,
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
      enforce: 'pre',
      test: /\.gz$/i,
      use: 'gzip',
    }, {
      // loader: 'ejs-loader',
      // query: {
      //   htmlWebpackPlugin: HtmlWebpackPlugin,
      // },
      // test: /\.ejs$/i,
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
    global: true,
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

    new CleanWebpackPlugin([
      'build',
      'dist',
    ], {
      allowExternal: false,
      dry: false,
      exclude: [
        'build/views',
        'views',
      ],
      root: path.resolve(__dirname),
      verbose: true,
      watch: false,
    }),

    new CopyWebpackPlugin([{
      from: 'views',
      to: 'views',
      toType: 'dir',
    }]),

    new ProvidePlugin({
      _: 'lodash',
      htmlWebpackPlugin: HtmlWebpackPlugin,
      title: 'wefawerasedf',
    }),

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
      // 'DEBUG',
      'GMAPS_STATIC_KEY',
      'NODE_ENV',
      'PORT',
    ]),

    new LoaderOptionsPlugin({
      debug: false,
      minimize: !!isProdEnv,
      options: {
        context: __dirname,
        postcss: { PostCSS },
      },
    }),

    // Extract CSS chunks:
    new ExtractTextPlugin({
      disable: !isProdEnv,
      filename: '[name].css',
      ignoreOrder: false,
    }),

    new optimize.CommonsChunkPlugin({
      chunks: ['polyfills', 'bundle'],
      minChunks: 2, // A module must be shared among at least 2 children before extraction into a commons chunk
      name: 'commons',
    }),

    new optimize.CommonsChunkPlugin({
      // This prevents stylesheet resources with the .css or .scss extension
      // from being moved from their original chunk to the vendor chunk:
      minChunks({ context: moduleCtx = [], resource: moduleResource = '' }, count) {
        return (!!moduleResource && (/^.*\.(s?css)$/).test(moduleResource))
          ? false
          : !!moduleCtx && moduleCtx.includes('node_modules');
      },
      name: 'vendor',
    }),

    /**
     * By invoking the `CommonsChunkPlugin` on a `name` whose value is not likewise defined as an entrypoint in the
     * Webpack configuration, it is possible to extract the Webpack bootstrap logic into a file all its own.
     * @type {Function}
     */
    new optimize.CommonsChunkPlugin({
      minChunks: Infinity,
      name: 'manifest',
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
    new HtmlWebpackPlugin({
      chunksSortMode: 'dependency',
      favicon: path.resolve(__dirname, 'assets/images/favicon.ico'),
      filename: 'index.html', // output (relative to `output.path`)   == USE THIS: `views/index.output.ejs`
      hash: false,
      inject: 'body',
      minify: !!isProdEnv ? {
        collapseWhitespace: true,
        conservativeCollapse: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: false,
        useShortDoctype: true,
      } : false,
      showErrors: true, // !isProdEnv,
      template: 'views/index.html', // == USE THIS: `!!raw-loader!${path.join(__dirname, 'build/views/index.ejs')}`,
      // '!ejs-render!views/index.ejs', // '!!ejs-loader!./views/index.ejs', // path.resolve(__dirname, 'views/index.ejs'),
      title: 'Home | React-Timeline',
      xhtml: true,
    }),
  ],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
    extensions: ['.coffee', '.css', '.ejs', '.js', '.json', '.jsx', '.vue', '.web.js', '.webpack.js'],
    modules: ['bower_components', 'node_modules', 'shared', 'web_modules'],
    plugins: [],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  target: 'web',
};

export const DEV_CONFIG = {
  // devServer: {
  //   clientLogLevel: 'info',
  //   compress: true,
  //   contentBase: path.resolve(__dirname, 'build'),
  //   historyApiFallback: true,
  //   host: 'localhost',
  //   hot: true,
  //   inline: true,
  //   noInfo: false,
  //   port: 3000,
  //   publicPath: '/', // '/assets/',
  // },
  module: {
    rules: [{
      test: /\.css$/i,
      use: [{
        loader: 'style',
        options: {
          sourceMap: true,
        },
      }, {
        loader: 'css',
        options: {
          sourceMap: true,
        },
      }],
    }, {
      test: /\.less$/i,
      use: [{
        loader: 'style',
        options: {
          sourceMap: true,
        },
      }, {
        loader: 'css',
        options: {
          sourceMap: true,
        },
      }, {
        loader: 'less',
        options: {
          sourceMap: true,
        },
      }],
    }, {
      test: /\.s(a|c)ss$/i,
      use: [{
        loader: 'style',
        options: {
          sourceMap: true,
        },
      }, {
        loader: 'css',
        options: {
          sourceMap: true,
        },
      }, {
        loader: 'postcss',
        options: {
          sourceMap: true, // Set to `inline` to include as an annotation comment
        },
      }, {
        loader: 'sass',
        options: {
          outputStyle: 'expanded',
          sourceMap: true,
          sourceMapContents: true,
        },
      }],
    }],
  },
  plugins: [
    new Webpack.BannerPlugin({
      banner: `
        chunkHash:\t[chunkhash],
        file:\t[file]
        fileBase:\t[filebase],
        hash:\t[hash],
        name:\t[name],
        query:\t[query],
      `,
      entryOnly: false,
      raw: false,
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerHost: '127.0.0.1',
    //   analyzerMode: 'disabled', // <'disabled' | 'server' | 'static'>
    //   analyzerPort: 8888,
    //   defaultSizes: 'parsed', // <'stats' | 'parsed' | 'gzip'>
    //   generateStatsFile: true,
    //   logLevel: 'info',
    //   openAnalyzer: false,
    //   reportFilename: 'bundle-analysis.html',
    //   statsFilename: 'bundle-stats.json',
    //   statsOptions: null,
    // }),
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
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

export const PROD_CONFIG = {
  module: {
    rules: [{
      test: /\.css$/i,
      use: ExtractTextPlugin.extract({
        fallback: 'style',
        use: [{
          loader: 'css',
          options: {
            minimize: true,
            sourceMap: false,
          },
        }],
      }),
    }, {
      test: /\.less$/i,
      use: ExtractTextPlugin.extract({
        fallback: 'style',
        use: [{
          loader: 'css',
          options: {
            minimize: true,
            sourceMap: false,
          },
        }, 'less'],
      }),
    }, {
      test: /\.s(a|c)ss$/i,
      use: ExtractTextPlugin.extract({
        fallback: 'style',
        use: [{
          loader: 'css',
          options: {
            minimize: true,
            sourceMap: false,
            url: false,
          },
        }, {
          loader: 'postcss',
          options: {
            // parser: 'postcss-js', // Enable for parsing of CSS-In-JS compiled styles
            sourceMap: false,
          },
        }, {
          loader: 'sass',
          options: {
            sourceMap: false,
          },
        }],
      }),
    }],
  },
  plugins: [
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
        sourcemap: false,
        warnings: false,
      },
    }),

    // Make sure that the plugin is after any plugins that add images:
    new ImageMinPlugin({
      disable: !isProdEnv, // Disable during development
      maxFileSize: Number.POSITIVE_INFINITY,
      minFileSize: 0,
      plugins: [
        ImageMinMozJpeg({
          progressive: true,
          quality: 100,
        }),
      ],
    }),
  ],
};

export default Merge(BASE_CONFIG, !!isProdEnv ? PROD_CONFIG : DEV_CONFIG);
