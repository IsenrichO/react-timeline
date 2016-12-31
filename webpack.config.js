const webpack = require('webpack'),
      path = require('path');


module.exports = {
  entry: [
    'webpack/hot/dev-server',
    path.join(__dirname, './app/App')
  ],
  output: {
    path: path.join(__dirname, 'assets'),
    filename: './dist/bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        loaders: ['babel']
      }, {
        test: /\.scss$/,
        loaders: [
          'style',
          'css',
          'autoprefixer?browsers=last 3 versions',
          'sass?outputStyle=expanded'
        ]
      }, { 
        test: /\.json$/i, 
        loader: 'json'
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader?name=/images/[name].[ext]'
      }, {
        test: /\.pdf/i,
        loader: 'file-loader?name=/docs/[name].[ext]'
      }
    ]
  },
  watch: true,
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    colors: true,
    contentBase: __dirname,
    noInfo: false,
    hot: true,
    inline: true,
    port: 3000,
    host: 'localhost'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
      sourceMap: false
    })
  ],
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};

// module.exports = require('webpack.config.js');
