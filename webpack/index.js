const Merge = require('webpack-merge');

// Webpack Environment-Specific Configs:
const { default: BASE_CONFIG } = require('./common.config.babel');
const { default: DEV_CONFIG } = require('./dev.config.babel');
const { default: PROD_CONFIG } = require('./prod.config.babel');

const { isProdEnv } = require('./common');

/**
 * As a workaround to the `EMFILE: too many open files` and/or `ENFILE: file table overflow` errors
 * that may occur when Webpack is used with the `CopyWebpackPlugin`, the `fs` Node function may be
 * globally patched so as to allow for graceful handling of the error(s).
 */
const fs = require('fs');
require('graceful-fs').gracefulify(fs);

/* DEFAULT MERGED CONFIG EXPORT */
// export default
module.exports = Merge(
  BASE_CONFIG,
  !!isProdEnv ? PROD_CONFIG : DEV_CONFIG,
);
