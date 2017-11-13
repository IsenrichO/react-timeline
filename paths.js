const path = require('path');
const fs = require('fs-extra');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = (relativePath) => path.resolve(appDirectory, relativePath);

/* eslint-disable sort-keys */
const paths = {
  appBuild: resolvePath('public'),
  appHtml: resolvePath('src/home.ejs'),
  appIndexJs: resolvePath('src/index.js'),
  packageJsonPath: resolvePath('package.json'),
  publicPath: '/iris/',
  publicUrl: '/iris',

  // Root-level directory paths:
  assetsDirPath: resolvePath('assets'),
  configDirPath: resolvePath('config'),
  dbDirPath: resolvePath('db'),
  nodeModulesPath: resolvePath('node_modules'),
  serverDirPath: resolvePath('server'),
  servicesDirPath: resolvePath('services'),
  srcDirPath: resolvePath('src'),
  testDirPath: resolvePath('test'),

  // Root-level file paths:
  rootServerPath: resolvePath('server.js'),
  rootYarnLockPath: resolvePath('yarn.lock'),
};
/* eslint-enable sort-keys */

module.exports = paths;
