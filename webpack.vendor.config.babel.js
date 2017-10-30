import path from 'path';
import DotEnv from 'dotenv-webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import Merge from 'webpack-merge';
import Webpack from 'webpack';

const isProdEnv = (process.env.NODE_ENV === 'production');

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

const BASE_VENDOR_CONFIG = {
  cache: true,
  devtool: 'eval-source-map', // `cheap-${isProdEnv ? '' : 'module'}-source-map`,
  entry: {
    vendor: VENDOR_LIBS,
  },
  plugins: [
    new Webpack.DllPlugin({
      context: __dirname,
      name: '[name]_[hash]',
      path: path.join(__dirname, 'manifest.json'),
    }),
  ],
};

export default BASE_VENDOR_CONFIG;
