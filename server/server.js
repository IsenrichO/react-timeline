require('@babel/register')({
  ignore: /node_modules/,
});

// Browser variable declaration should be ignored by server:
delete process.env.BROWSER;

// Imports
const utils = require('./utils');
const express = require('express');
const dedent = require('dedent');
const webPackCustomMiddleware = require('./middleware').webpack;
const router = require('./middleware').router;
const compression = require('compression');
const app = express();

// Configuration
const port = utils.env.isProduction ? process.env.PORT : 9000;


// Environment setup
if (utils.env.isDevelopment) {
  // turn this line off to turn off SSR updates
  if (utils.env.ssrEnabled) {
    if (!require('piping')({hook: true, includeModules: false})) {
      return;
    }
  }

  app.use(function(req, res, next) {
    if (req.url !== '/') {
      // if you're not the root url, pass throught the webpack middleware
      webPackCustomMiddleware.WebPackMiddleware(req, res, next);
    } else {
      // Will pass through a middleware to server side render index.html
      next();
    }
  });

  app.use(webPackCustomMiddleware.HotReloadMiddleware);
}


// Other middlewares
app.use(compression());
app.use(router);

// app.listen(port, () => console.info('Server running on port ' + port));

app.listen(process.env.PORT || 3000, () => {
  // Include the below to obviate the `ERR_INCOMPLETE_CHUNKED_ENCODING` console error:
  // app.keepAliveTimeout = 0;

  const serverPort = app.address().port;
  console.info(dedent(`
    ================================================================
    🌎 Server is up and running on LocalHost at Port ${serverPort}:
                  < http://localhost:${serverPort}/ >
    ================================================================
    \\n
  `));
});
