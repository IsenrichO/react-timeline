require('babel-register');
require('react-hot-loader/patch');

const path = require('path');
const fs = require('fs');
const dedent = require('dedent');
const dotenv = require('dotenv').config();
const { v2: Cloudinary } = require('cloudinary');
const Webpack = require('webpack');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const App = require('./server/app.js');
const { default: WebpackConfig } = require('./webpack.config.babel');

Cloudinary.config({
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  cloud_name: process.env.CLOUD_NAME,
});

// App.get('*', (req, res) => {
//   res.redirect('http://localhost:3000');
// });

//
const webpackBundleInvalidator = (instance) => (evt, fileName) => {
  console.info(`Changes to this project's webpack configuration detected in ${fileName}`);

  // Recompile the bundle on file change detection:
  instance.invalidate();
};

const serveApplication = ((compiler) => {
  const DevMiddlewareInstance = WebpackDevMiddleware(compiler, {
    noInfo: false, // Supress all but warnings and errors in console 
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': 'http://<appserver hostname>:<appserver port>',
    },
    historyApiFallback: true,
    hot: true,
    publicPath: WebpackConfig.output.publicPath,
    quiet: false,
    stats: { colors: true },
  });

  // Register the `webpack-dev-middleware` with the Express app:
  App.use(DevMiddlewareInstance);

  // Watch for changes occurring in files external to the (already monitored) `src` directory,
  // including any Webpack configuration file(s), and subsequently initiate a bundle rebuild:
  fs.watch('./webpack.config.babel.js', webpackBundleInvalidator(DevMiddlewareInstance));

  App.use(WebpackHotMiddleware(compiler, {
    heartbeat: 2000,
    hot: true,
    log: console.info,
    path: '/__webpack_hmr',
  }));
})(Webpack(WebpackConfig));

const Server = App.listen(process.env.PORT || 3000, () => {
  // Include the below to obviate the `ERR_INCOMPLETE_CHUNKED_ENCODING` console error:
  Server.keepAliveTimeout = 0;

  const serverPort = Server.address().port;
  console.info(dedent(`
    ================================================================
    🌎 Server is up and running on LocalHost at Port ${serverPort}:
                  < http://localhost:${serverPort}/ >
    ================================================================
    \\n
  `));
});
