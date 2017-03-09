'use strict';
import Webpack from 'webpack';
import Merge from 'webpack-merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import DotEnv from 'dotenv-webpack';
import Path from 'path';
import PostCSS from './postcss.config';


// const appEnv = (process.env.NODE_ENV || 'dev');
const isProdEnv = (process.env.NODE_ENV === 'production');
  console.log(`Node Environment:\t${process.env.NODE_ENV}`);

const VENDOR_LIBS = [
  'body-parser',
  'bson',
  'cloudinary',
  'cloudinary_react',
  'cloudinary_js',
  'dotenv-webpack',
  'jquery',
  'lodash',
  'react',
  'react-dom',
  'react-motion',
  'react-redux',
  'react-router',
  'react-router-redux',
  'redux',
  'redux-thunk',
  'request',
  'uuid',
  'webpack-merge'
];

// 'react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:3000', 'webpack/hot/only-dev-server'

// patch: 'react-hot-loader/patch',
// client: 'webpack-dev-server/client?http://localhost:3000',
// hmr: 'webpack/hot/only-dev-server',

// bundle: Path.resolve(__dirname, 'src/App'),
// context: Path.resolve(__dirname, 'src'),


const BASE_CONFIG = {
  entry: {
    patch: 'react-hot-loader/patch',
    hmr: 'webpack/hot/only-dev-server',
    bundle: Path.resolve(__dirname, 'src/HMR'),
    vendor: VENDOR_LIBS
  },
  output: {
    path: Path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    // publicPath: '/' // Server-Relative
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        include: Path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components)/,
        use: 'babel'
      }, {
        test: /\.css$/i,
        loader: ExtractTextPlugin.extract({
          fallback: 'style',
          use: 'css'
        })
      }, {
        test: /\.(scss|sass)$/i,
        loaders: ExtractTextPlugin.extract({
          fallback: 'style',
          use: ['css', 'postcss', 'sass?outputStyle=expanded']
        })
      }, {
        test: /\.json$/i,
        use: 'json'
      }, {
        test: /\.(bmp|gif|jpe?g|png|svg|ttif)$/i,
        use: [
          // {
          //   loader: 'url',
          //   options: { limit: 40000 }
          // },
          'file?name=/images/[name].[ext]',
          'image-webpack'
        ]
      }, {
        test: /\.(pdf|doc[mstx]?|ppt[mstx]?|od[fpst])$/i,
        use: 'file?name=/docs/[name].[ext]'
      }
    ]
  },
  plugins: [
    // Configure and read in local environment variables:
    new DotEnv({
      path: './.env'
    }),
    new Webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    }),
    new Webpack.DefinePlugin({
      // 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')

      // 'process.env': {
      //   NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      // }
    }),
    new Webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        postcss: { PostCSS }
      }
    }),
    new ExtractTextPlugin('styles.css'),
    new HTMLWebpackPlugin({
      template: 'assets/index.html'
    })
  ],
  node: {
    console: false,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  cache: true,
  watch: true,
  devtool: `${isProdEnv ? 'cheap-eval' : 'inline'}-source-map`,
  resolve: {
    extensions: ['.js', '.jsx']
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  }
};

const DEV_SERVER = {
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NamedModulesPlugin()
  ],
  devServer: {
    contentBase: Path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    host: 'localhost',
    hot: true,
    inline: true,
    noInfo: false,
    port: 3000,
    publicPath: '/'
  },
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
      yellow: '\u001b[1m\u001b[33m'
    },
    errorDetails: true,
    hash: false,
    modules: false,
    publicPath: false,
    reasons: true,
    timings: true,
    version: false,
    warnings: true
  }
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
