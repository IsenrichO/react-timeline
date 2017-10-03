import Path from 'path';

import DotEnv from 'dotenv-webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import Merge from 'webpack-merge';
import Webpack from 'webpack';

import PostCSS from './postcss.config';

const isProdEnv = (process.env.NODE_ENV === 'production');
console.log(`Node Environment:\t${process.env.NODE_ENV}`);

const VENDOR_LIBS = [
  'body-parser',
  'bson',
  'cloudinary',
  'cloudinary-react',
  'cloudinary_js',
  // 'dotenv-webpack',
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

// bundle: Path.resolve(__dirname, 'src/App'),
// context: Path.resolve(__dirname, 'src'),


const BASE_CONFIG = {
  cache: true,
  devtool: 'eval-source-map', // `cheap-${isProdEnv ? '' : 'module'}-source-map`,
  entry: {
    bundle: Path.resolve(__dirname, 'src/App'),
    hmr: 'webpack/hot/only-dev-server',
    patch: 'react-hot-loader/patch',
    vendor: VENDOR_LIBS,
  },
  module: {
    rules: [
      {
        exclude: /(node_modules|bower_components)/,
        include: Path.resolve(__dirname, 'src'),
        test: /\.jsx?$/i,
        use: 'babel',
      }, {
        loader: ExtractTextPlugin.extract({
          fallback: 'style',
          use: 'css',
        }),
        test: /\.css$/i,
      }, {
        loaders: ExtractTextPlugin.extract({
          fallback: 'style',
          use: ['css', 'postcss', 'sass?outputStyle=expanded'],
        }),
        test: /\.(scss|sass)$/i,
      }, {
        test: /\.json$/i,
        use: 'json',
      }, {
        test: /\.(bmp|gif|jpe?g|png|svg|ttif)$/i,
        use: [
          // {
          //   loader: 'url',
          //   options: { limit: 40000 }
          // },
          'file?name=/images/[name].[ext]',
          'image-webpack',
        ],
      }, {
        test: /\.(pdf|doc[mstx]?|ppt[mstx]?|od[fpst])$/i,
        use: 'file?name=/docs/[name].[ext]',
      },
    ],
  },
  node: {
    console: false,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  output: {
    filename: '[name].[hash].js',
    path: Path.join(__dirname, 'dist'),
    publicPath: '',  // Server-Relative
  },
  plugins: [
    // Configure and read in local environment variables:
    new DotEnv({
      path: './.env',
      safe: false,
      silent: false,
      systemvars: false,
    }),
    new ExtractTextPlugin('styles.css'),
    new HTMLWebpackPlugin({
      template: 'assets/index.html',
    }),
    // Must follow DotEnv to prevent `NODE_ENV` being overwritten:
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV) || 'dev',
      },
    }),
    new Webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true,
      options: {
        postcss: { PostCSS },
      },
    }),
    new Webpack.optimize.CommonsChunkPlugin({
      minChunks: Infinity,
      names: ['vendor', 'manifest'],
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  watch: true,
};

const DEV_SERVER = {
  devServer: {
    contentBase: Path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    host: 'localhost',
    hot: true,
    inline: true,
    noInfo: false,
    port: 3000,
    publicPath: '/',
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NamedModulesPlugin(),
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

const AGGREGATE_CONFIG = isProdEnv
  ? BASE_CONFIG
  : Merge(BASE_CONFIG, DEV_SERVER);

export default AGGREGATE_CONFIG;

//     new Webpack.optimize.DedupePlugin(),
//     new Webpack.optimize.UglifyJsPlugin({
//       compress: { warnings: false },
//       output: { comments: false },
//       sourceMap: false
//     })


// resolve: {
//   alias:
// }
