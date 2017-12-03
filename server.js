require('babel-register');
require('react-hot-loader/patch');

const express = require('express');
const http = require('http');
const path = require('path');
const dedent = require('dedent');
// const expressStaticGzip = require('express-static-gzip');
// const path = require('path');
const { v2: Cloudinary } = require('cloudinary');
const DotEnvExpand = require('dotenv-expand');
const app = require('./server/app');

const appEnv = require('dotenv-safe').load({
  allowEmptyValues: false,
  encoding: 'utf8',
  path: path.resolve(__dirname, './.env'),
  sample: path.resolve(__dirname, './.env.example'),
});

DotEnvExpand(appEnv);

// Register Cloudinary configuration tokens:
// Cloudinary.config({
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
//   cloud_name: process.env.CLOUD_NAME,
// });
const {
  API_KEY: api_key,
  API_SECRET: api_secret,
  CLOUD_NAME: cloud_name,
} = (process.env || {});

Cloudinary.config({ api_key, api_secret, cloud_name });

(function() {
  // Step 1) Create & configure a webpack compiler:
  const Webpack = require('webpack');
  const { default: webpackConfigFunction } = require('./webpack.config.babel');

  const WebpackConfig = webpackConfigFunction(appEnv);
  const compiler = Webpack(WebpackConfig);

  // Step 2) Attach the dev middleware to the compiler & the server:
  app.use(require('webpack-dev-middleware')(compiler, {
    historyApiFallback: true,
    noInfo: false, // Supress all but warnings and errors in console 
    publicPath: WebpackConfig.output.publicPath,
    quiet: false,
    stats: { colors: true },
  }));

  // Step 3) Attach the hot middleware to the compiler & the server:
  app.use(require('webpack-hot-middleware')(compiler, {
    heartbeat: 10 * 1000,
    log: console.info,
    path: '/__webpack_hmr',
  }));
})();

// Do anything you like with the rest of your express application:
app.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/index.html');
  next();
});

app.use(express.static(__dirname + '/build'));

if (require.main === module) {
  const server = http.createServer(app);
  const { PORT = 3000 } = (process.env || {});

  server.listen(PORT, () => {
    // Include the below to obviate the `ERR_INCOMPLETE_CHUNKED_ENCODING` console error:
    server.keepAliveTimeout = 0;

    const { port: PORT } = server.address();
    console.info(dedent(`
      \\n
      ========================================================================
          🌎 Server is running on localhost and listening at port ${PORT}:
                          < http://localhost:${PORT} >
      ========================================================================
      \\n
    `));
  });
}

module.exports = app;
