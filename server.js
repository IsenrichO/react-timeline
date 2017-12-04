require('babel-register');
require('react-hot-loader/patch');

const express = require('express');
const http = require('http');
const path = require('path');
const dedent = require('dedent');
// const expressStaticGzip = require('express-static-gzip');
const { v2: Cloudinary } = require('cloudinary');
const app = require('./server/app');

// Register Cloudinary configuration tokens:
const {
  API_KEY: api_key,
  API_SECRET: api_secret,
  CLOUD_NAME: cloud_name,
} = (process.env || {});

Cloudinary.config({ api_key, api_secret, cloud_name });

// Setup view engine:
// app.set('views', path.resolve(__dirname, 'build/views'));
// app.set('view engine', 'ejs');

// Preliminarily, map the `*.ejs` template engine to their `*.html` file equivalents:
app.engine('html', require('ejs').renderFile);

const webpackBundleInvalidator = (instance) => (evt, fileName) => {
  console.info(`Changes to this project's webpack configuration detected in ${fileName}`);

  // Recompile the bundle on file change detection:
  instance.invalidate();
};

(function() {
  // Step 1) Create & configure a webpack compiler:
  const Webpack = require('webpack');
  const { default: WebpackConfig } = require('./webpack.config.babel'); // webpackConfigFunction

  // const WebpackConfig = webpackConfigFunction(appEnv);
  const compiler = Webpack(WebpackConfig);

  // Step 2) Attach the dev middleware to the compiler & the server:
  const webpackDevMiddlewareInstance = require('webpack-dev-middleware')(compiler, {
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': 'http://<appserver hostname>:<appserver port>',
    },
    historyApiFallback: true,
    noInfo: false, // Supress all but warnings and errors in console 
    publicPath: WebpackConfig.output.publicPath,
    quiet: false,
    stats: {
      assets: true,
      assetsSort: '!field', // Reversed-order `field` sort
      cached: true,
      cachedAssets: true, // Show cached assets
      children: false,
      chunksSort: 'field',
      colors: true,
      depth: false,
      // displayEntrypoints: true,
      env: true,
      errors: true,
      errorDetails: true,
      maxModules: Number.POSITIVE_INFINITY,
      moduleTrace: true, // Show origin(s) of warning(s)/error(s)
      performance: true, // Show performance hint when file size exceeds `performance.maxAssetSize`
      publicPath: true, // Add public path information
      reasons: true, // Include explanatory rationale for why modules are included
      warnings: true, // Add warnings
    },
    watchOptions: {
      aggregateTimeout: 750,
      ignored: /bower_components|node_modules/,
      poll: 2000, // Check for changes every other second
    },
  });
  app.use(webpackDevMiddlewareInstance);

  // Step 3) Attach the hot middleware to the compiler & the server:
  app.use(require('webpack-hot-middleware')(compiler, {
    heartbeat: 10 * 1000,
    log: console.info,
    path: '/__webpack_hmr',
  }));

  webpackDevMiddlewareInstance.waitUntilValid(() => {
     console.log('Package is in a valid state');
     app.get('*', (req, res) => {
       // res.sendFile(__dirname + '/index.html');
       res.render('index.html', {
         title: 'Home | React Timeline',
       });
     });
   });
})();

// Do anything you like with the rest of your express application:
// app.get('*', (req, res) => { //, next
//   // res.sendFile(__dirname + '/index.html');
//   res.render('index', {
//     title: 'WAHOOOOOOOOOOOOOOOOOO',
//   });
//   // next();
// });

// // Serve all static resources with compression and fall back to non-compressed resource:
app.use(express.static(__dirname + '/build'));

// app.use(expressStaticGzip(path.join(__dirname, '/build'), {
//   enableBrotli: true,
//   indexFromEmptyFile: false,
// }));

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


// // App.get('*', (req, res) => {
// //   res.redirect('http://localhost:3000');
// // });

// const serveApplication = ((compiler) => {
//   const DevMiddlewareInstance = WebpackDevMiddleware(compiler, {
//     noInfo: false, // Supress all but warnings and errors in console 
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
