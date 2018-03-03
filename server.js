require('@babel/register');
require('react-hot-loader/patch');

const express = require('express');
const fs = require('fs-extra');
const http = require('http');
const https = require('https');
const path = require('path');
const dedent = require('dedent');
const errorHandler = require('errorhandler');
const expressStaticGzip = require('express-static-gzip');
const { v2: Cloudinary } = require('cloudinary');
const app = require('./server/app');

// Register Cloudinary configuration tokens:
const {
  API_KEY: api_key,
  API_SECRET: api_secret,
  CLOUD_NAME: cloud_name,
} = (process.env || {});

Cloudinary.config({ api_key, api_secret, cloud_name });

// Create object mapping for using https on LocalHost:
const LOCAL_SSL_CERT = {
  cert: fs.readFileSync(path.resolve('build/assets/certs/server.crt')),
  key: fs.readFileSync(path.resolve('build/assets/certs/server.key')),
};

// Setup view engine:
// app.set('views', path.resolve(__dirname, 'build/views'));
// app.set('view engine', 'ejs');

// Preliminarily, map the `*.ejs` template engine to their `*.html` file equivalents:
app.engine('html', require('ejs').renderFile);

const webpackBundleInvalidator = (instance) => (eventType, fileName) => {
  // Ensure a valid `eventType` is caught:
  if (!['change', 'rename'].includes(eventType)) throw new Error(`Unrecognized eventType ${eventType}`);

  console.info(`💩 Changes to this project's webpack configuration detected in ${fileName}`);

  // Recompile the bundle on file change detection:
  instance.invalidate();
};

const webpackStatsOpts = {
  assets: true,
  assetsSort: '!field', // Reversed-order `field` sort
  cached: true,
  cachedAssets: true, // Show cached assets
  children: false,
  chunksSort: 'field',
  colors: true,
  depth: false,
  displayEntrypoints: true,
  env: true,
  errorDetails: true,
  errors: true,
  maxModules: Number.POSITIVE_INFINITY,
  moduleTrace: true, // Show origin(s) of warning(s)/error(s)
  performance: true, // Show performance hint when file size exceeds `performance.maxAssetSize`
  publicPath: true, // Add public path information
  reasons: true, // Include explanatory rationale for why modules are included
  warnings: true, // Add warnings
};

(function() {
  // STEP 1) Create & configure a webpack compiler:
  const Webpack = require('webpack');
  const WebpackConfig = require('./webpack'); // webpackConfigFunction

  // const WebpackConfig = webpackConfigFunction(appEnv);
  const compiler = Webpack(WebpackConfig);

  // STEP 2) Attach the `webpack-dev-middleware` to the compiler & the server:
  const webpackDevMiddlewareInstance = require('webpack-dev-middleware')(compiler, {
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': 'https://<appserver hostname>:<appserver port>',
    },
    historyApiFallback: true,
    noInfo: true, // Supress all but warnings and errors in console
    publicPath: WebpackConfig.output.publicPath,
    quiet: false,
    stats: {
      colors: true,
    },
    watchOptions: {
      aggregateTimeout: 750,
      ignored: /bower_components|node_modules/i,
      poll: 2000, // Check for changes every other second
    },
  });
  app.use(webpackDevMiddlewareInstance);

  // STEP 3) Attach the `webpack-hot-middleware` to the compiler & the server:
  app.use(require('webpack-hot-middleware')(compiler, {
    heartbeat: 10 * 1000,
    log: console.info,
    path: '/__webpack_hmr',
  }));

  webpackDevMiddlewareInstance.waitUntilValid(() => {
    console.info('Package is in a valid state');
    app.get('*', (req, res) => {
      res.render('index.html', {
        title: 'Home | React Timeline',
      });
    });
  });

  /**
   * Watch for changes occurring in files external to the (already monitored) `src` directory,
   * including any Webpack configuration file(s), and subsequently initiate a bundle rebuild:
   */
  fs.watch('./package.json', webpackBundleInvalidator(webpackDevMiddlewareInstance));
  fs.watch('./server', webpackBundleInvalidator(webpackDevMiddlewareInstance));
  fs.watch(
    './webpack',
    { recursive: true }, // Only supported on Mac OS and Windows
    webpackBundleInvalidator(webpackDevMiddlewareInstance),
  );
})();

// Event listener for HTTP server "error" event:
const handleError = ({ port: serverPort }) => (error) => {
  if (error.syscall !== 'listen') throw error;

  const bind = (typeof serverPort === 'string')
    ? `Pipe ${serverPort}`
    : `Port ${serverPort}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind}  is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Do anything you like with the rest of your express application:
// app.get('*', (req, res) => { //, next
//   // res.sendFile(__dirname + '/index.html');
//   res.render('index', {
//     title: 'WAHOOOOOOOOOOOOOOOOOO',
//   });
//   // next();
// });

// // // Serve all static resources with compression and fall back to non-compressed resource:
// app.use(express.static(`${__dirname}/build`));

app.use(expressStaticGzip(path.join(__dirname, '/build'), {
  enableBrotli: true,
  indexFromEmptyFile: false,
}));

if (require.main === module) {
  const {
    NODE_ENV = 'development',
    PORT = 3000,
    USE_HTTPS = 'TRUE',
  } = (process.env || {});

  const server = (USE_HTTPS === 'TRUE')
    ? https.createServer(LOCAL_SSL_CERT, app)
    : http.createServer(app);

  /**
   * Catch `404: Not found` errors and forward to the respective environment-specific error
   * handler. The Express.js `errorHandler` middleware should only be enabled in development,
   * whilst custom handler functionality is enabled for production.
   */
  if (NODE_ENV === 'production') {
    app.use((req, res) => {
      const error = new Error(`${req.url} not found`);
      res.render('error', { error });
    });
  } else {
    app.use(errorHandler());
  }

  // Set the port upon which the server is set to listen:
  app.set('port', PORT);

  // Direct the server to listen on the assigned port, on all network interfaces:
  server.listen(PORT, () => {
    const { port: SERVER_PORT } = server.address();

    /**
     * Set a zero-valued `keepAliveTimeout` on the server to obviate
     * the `ERR_INCOMPLETE_CHUNKED_ENCODING` console error.
     */
    server.keepAliveTimeout = 0;

    console.info(dedent(`
      \\n
      ========================================================================
       🌎 Server is running on localhost and listening at port ${SERVER_PORT}:
                          < https://localhost:${PORT} >
      ========================================================================
      \\n
    `));
  });

  app.on('error', handleError(server));
}

module.exports = app;


// // App.get('*', (req, res) => {
// //   res.redirect('http://localhost:3000');
// // });

// const serveApplication = ((compiler) => {
//   const DevMiddlewareInstance = WebpackDevMiddleware(compiler, {
//     noInfo: false, // Suppress all but warnings and errors in console
//     headers: {
//       'Access-Control-Allow-Credentials': true,
//       'Access-Control-Allow-Origin': 'http://<appserver hostname>:<appserver port>',
//     },
//     historyApiFallback: true,
//     hot: true,
//     publicPath: WebpackConfig.output.publicPath,
//     quiet: false,
//     stats: { colors: true },
//   });

//   // Register the `webpack-dev-middleware` with the Express app:
//   App.use(DevMiddlewareInstance);

//   // Serve all static resources with compression and fall back to non-compressed resource
//   App.use('/', expressStaticGzip(path.join(__dirname, 'build'), {
//     // customCompressions: [{
//     //   encodingName: 'deflate',
//     //   fileExtension: 'zz',
//     // }],
//     enableBrotli: true,
//     indexFromEmptyFile: false,
//   }));

//   // Watch for changes occurring in files external to the (already monitored) `src` directory,
//   // including any Webpack configuration file(s), and subsequently initiate a bundle rebuild:
//   fs.watch('./webpack.config.babel.js', webpackBundleInvalidator(DevMiddlewareInstance));

//   App.use(WebpackHotMiddleware(compiler, {
//     heartbeat: 2000,
//     hot: true,
//     log: console.info,
//     path: '/__webpack_hmr',
//   }));
// })(Webpack(WebpackConfig));

// // Register the `webpack-dev-middleware` with the Express app:
// // App.use(DevMiddlewareInstance);

// // App.use('*', function(req, res, next) {
// //   var filename = path.join(WebpackCompiler.outputPath, 'index.html');

// //   DevMiddlewareInstance.waitUntilValid(() => {
// //     WebpackCompiler.outputFileSystem.readFile(filename, (err, result) => {
// //       if (err) {
// //         console.error(`Encountered webpack-dev-middleware error: ${err}`);
// //         return next(err);
// //       }
// //
// //       // res.set('content-type', 'text/html');
// //       res.send(result);
// //       res.end();
// //     });
// //   });
// // });
