import path               from 'path';

// Webpack Plugins:
import {
  DefinePlugin,
  EnvironmentPlugin,
  IgnorePlugin,
  LoaderOptionsPlugin,
  NoEmitOnErrorsPlugin,
  optimize,
  ProvidePlugin,
}                         from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin  from 'copy-webpack-plugin';
import ExtractTextPlugin  from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin  from 'html-webpack-plugin';

// Shared Resources:
import {
  BABEL_ENV,
  CLOUD_NAME,
  DEBUG_MODE,
  EXTERNALS,
  GMAPS_STATIC_KEY,
  hmrScriptEntry,
  invokeLoader,
  isProdEnv,
  NODE_ENV,
  PORT,
  PROC_ENV,
  resolve,
  VENDOR_LIBS,
}                         from './common';

// PostCSS Post-Processor Configuration:
import PostCSS            from '../postcss.config';

// export const BASE_CONFIG = (env, argv) => ({
const BASE_CONFIG = {
  bail: !isProdEnv,
  cache: !isProdEnv,
  context: resolve(),
  devtool: !!isProdEnv
    ? 'cheap-module-source-map'
    : 'eval',
  entry: {
    main: [
      // HOT_MIDDLEWARE_SCRIPT,
      hmrScriptEntry,
      resolve('src', 'HMR'),
    ],
    polyfills: [
      require.resolve('../config/polyfills'),
    ],
    vendor: [...VENDOR_LIBS],
  },
  externals: EXTERNALS,
  module: {
    rules: [{
      exclude: /(node_modules|bower_components)/,
      include: resolve('src'), // path.resolve(__dirname, 'src'),
      loader: 'babel', // Rather than the `use` key, `loader` is required in conjunction with `query`
      query: {
        cacheDirectory: !!isProdEnv,
      },
      test: /\.jsx?$/i,
    }, {
      enforce: 'pre',
      test: /\.gz$/i,
      use: 'gzip',
    },
    /* {
      loader: 'ejs-loader',
      query: {
        htmlWebpackPlugin: HtmlWebpackPlugin,
      },
      test: /\.ejs$/i,
    }, */
    {
      test: /\.json$/i,
      use: 'json',
    }, {
      test: /\.ico$/i,
      use: 'file',
    }, {
      include: path.join(process.cwd(), 'assets', 'images'),
      test: /\.(bmp|gif|jpe?g|png|svg|ttif)$/i,
      use: [
        // {
        //   loader: 'url',
        //   options: { limit: 3000 },
        // },
        invokeLoader('file', {
          emitFile: true,
          name: '[path][name].[ext]',
        }),
        // 'file?name=assets/images/[name].[ext]',
        // 'image-webpack',
      ],
    }, {
      test: /\.(pdf|doc[mstx]?|ppt[mstx]?|od[fpst])$/i,
      use: 'file?name=/docs/[name].[ext]',
    }],
  },
  node: {
    console: false,
    fs: 'empty',
    global: true,
    net: 'empty',
    tls: 'empty',
  },
  output: {
    chunkFilename: '[id].[name]-chunk.[hash].js',
    // Point sourcemap entries to original disk location:
    devtoolModuleFilenameTemplate(info) {
      return path.resolve(info.absoluteResourcePath);
    },
    filename: '[name].[hash].bundle.js',
    hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
    hotUpdateMainFilename: 'hot/[hash].hot-update.json',
    jsonpFunction: 'webpackJsonp',
    path: path.join(process.cwd(), 'build'), // NOTE: `__dirname === root`
    pathinfo: !isProdEnv,
    publicPath: '/', // Server-Relative
  },
  plugins: [
    /**
     * Direct Webpack to skip the emitting phase when it encounters compile-time errors. This
     * ensures that no error-laden assets are emitted.
     */
    new NoEmitOnErrorsPlugin(),

    /**
     * Assign the module and chunk IDs by occurrence count. IDs that are used often get lower, that
     * is to say, shorter IDs. This make IDs predictable reduces total file size and is recommended.
     */
    new optimize.OccurrenceOrderPlugin(),

    new CleanWebpackPlugin([
      'build',
      'dist',
    ], {
      allowExternal: false,
      dry: false,
      exclude: [
        'assets',
        'views',
      ],
      root: path.resolve(__dirname),
      verbose: true,
      watch: false,
    }),

    // Copy the `views` directory to the build directory:
    new CopyWebpackPlugin([{
      from: 'views',
      to: 'views',
      toType: 'dir',
    }, {
      from: 'assets/certs',
      to: 'assets/certs',
      toType: 'dir',
    }]),

    /**
     * Automatically load select modules for global availability. This is helpful for widely used
     * packages, as it prevents their needing to be `import`ed or `require`d individually for each
     * file where they are used.
     */
    new ProvidePlugin({
      // _: 'lodash',
      htmlWebpackPlugin: HtmlWebpackPlugin,
      title: 'React-Timeline | Web-Based Timeline Tool',
    }),

    /**
     * Moment.js is an extremely popular library that bundles large locale files by default due to
     * how Webpack interprets its code. This is a practical solution that requires the user to opt
     * into importing specific locales.
     * • Ref. <https://github.com/jmblog/how-to-optimize-momentjs-with-webpack>
     */
    new IgnorePlugin(/^\.\/locale$/, /moment$/),

    /**
     * The `DefinePlugin` allows for the creation of global constants that can be configured at
     * compile time. Its capacity to do so makes it one of the standard approaches toward creating
     * customizable behavior that differs between development builds and release builds.
     */
    new DefinePlugin(PROC_ENV),

    /**
     * The `EnvironmentPlugin` offers a shorthand that is functionally equivalent to the routinely
     * seen pattern of `DefinePlugin` being used on `process.env` keys (particularly `NODE_ENV`).
     * Note, that its position should follow that of the `DotEnv` (if used) in the plugin order to
     * prevent `NODE_ENV` being overwritten.
     */
    new EnvironmentPlugin({
      BABEL_ENV,
      CLOUD_NAME,
      DEBUG: !!DEBUG_MODE, // Revert to the optional `DEBUG_MODE` CLI flag as a default
      GMAPS_STATIC_KEY,
      NODE_ENV, // Use 'development' unless `process.env.NODE_ENV` is defined
      PORT,
    }),

    new LoaderOptionsPlugin({
      debug: !!DEBUG_MODE,
      minimize: !!isProdEnv,
      options: {
        context: resolve(),
        postcss: { PostCSS },
      },
    }),

    /**
     * [CommonsChunkPlugin description]
     * @param {Array}  options.minChunks({ context:      moduleCtx [description]
     * @param {[type]} count                [description]
     */
    // new optimize.CommonsChunkPlugin({
    //   // This prevents stylesheet resources with the .css or .scss extension
    //   // from being moved from their original chunk to the vendor chunk:
    //   filename: 'vendor.[hash].js',
    //   minChunks({ context: moduleCtx = [], resource: moduleResource = '' }, count) {
    //     return (!!moduleResource && (/^.*\.(s?css)$/).test(moduleResource))
    //       ? false
    //       : !!moduleCtx && moduleCtx.includes('node_modules');
    //   },
    //   name: 'vendor',
    // }),

    // new optimize.CommonsChunkPlugin({
    //   minChunks: isVendor,
    //   name: 'vendor',
    // }),

    new optimize.CommonsChunkPlugin({
      names: ['main', 'polyfills', 'vendor'],
    }),

    // new optimize.CommonsChunkPlugin({
    //   chunks: ['vendor'],
    //   filename: 'meta.[hash].js',
    //   name: 'meta',
    // }),

    /**
     * The `CommonsChunkPlugin` is an opt-in feature that creates a separate file (i.e., a "chunk"),
     * consisting of common modules shared between multiple entry points. By separating common
     * modules from bundles, the resulting chunked file can be loaded once initially, and stored in
     * cache for later use resulting in pagespeed optimizations.
     * @type {Array}
     */
    // new optimize.CommonsChunkPlugin({
    //   chunks: ['polyfills', 'bundle'],
    //   minChunks: 2, // A module must be shared among at least 2 children before extraction into a commons chunk
    //   name: 'commons',
    //   // names: ['polyfills', 'bundle'],
    // }),

    /**
     * [CommonsChunkPlugin description]
     * @param {[type]} { filename: 'node-static.js', name: 'node-static', minChunks(module, count
     *   [description]
     */
    // new optimize.CommonsChunkPlugin({
    //   filename: 'node-static.js',
    //   minChunks(module, count) {
    //     const { context } = module;
    //     return context && context.indexOf('node_modules') >= 0;
    //   },
    //   name: 'node-static',
    // }),

    /**
     * By invoking the `CommonsChunkPlugin` on a `name` whose value is not likewise defined as an
     * entrypoint in the Webpack configuration, it is possible to extract the Webpack bootstrap
     * logic (i.e., the extracted Webpack runtime) into a file all its own.
     */
    new optimize.CommonsChunkPlugin({
      minChunks: Infinity,
      name: 'manifest',
    }),

    /**
     * Apply the `ExtractTextWebpackPlugin` to extract text from a bundle, or bundles, into a
     * separate file. Because it is often recommended to reserve use of this plugin to only a
     * production setting, the `disable` option is conditionally set based on environment.
     */
    new ExtractTextPlugin({
      disable: !isProdEnv, // Disable plugin in `development` environment
      filename: '[name].css',
      ignoreOrder: false,
    }),

    /**
     * A plugin for a more aggressive chunk merging strategy. Even similar chunks are merged if the
     * total size is reduced enough. As option modules that are not common in these chunks can be
     * moved up the chunk tree to the parents.
     */
    new optimize.AggressiveMergingPlugin(),

    /**
     * Generates a solid base html page for your web application with all your webpack-generated
     * CSS and JS files built in. Supports custom templates, favicon, html-minifications and more.
     * Erect the templated root `index.html` file from the referenced skeleton view.
     */
    new HtmlWebpackPlugin({
      chunksSortMode: 'dependency',
      favicon: resolve('assets/images/favicon.ico'),
      filename: 'index.html', // output (relative to `output.path`) == USE THIS: `views/index.output.ejs`
      hash: false,
      inject: 'body',
      minify: !!isProdEnv ? {
        collapseWhitespace: true,
        conservativeCollapse: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: false,
        useShortDoctype: true,
      } : false,
      showErrors: true, // !isProdEnv,
      template: resolve('views/index.html'), // == USE THIS: `!!raw-loader!${path.join(__dirname, 'build/views/index.ejs')}`,
      // '!ejs-render!views/index.ejs', // '!!ejs-loader!./views/index.ejs', // path.resolve(__dirname, 'views/index.ejs'),
      title: 'Home | React-Timeline',
      xhtml: true,
    }),
  ],
  resolve: {
    alias: {
      '@HOCs': resolve('src/HOCs'),
      '@components': resolve('src/components'),
      '@constants': resolve('src/constants'),
      '@containers': resolve('src/containers'),
      '@root': resolve(),
      '@state': resolve('src/state'),
      '@store': resolve('src/store'),
      '@styles': resolve('src/style'),
      '@utils': resolve('src/util'),
      '~': resolve('src'),
      'react-native': 'react-native-web',
    },
    extensions: ['.coffee', '.css', '.ejs', '.js', '.json', '.jsx', '.vue', '.web.js', '.webpack.js'],
    modules: ['bower_components', 'node_modules', 'shared', 'web_modules'],
    plugins: [],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  target: 'web',
};

/* DEFAULT EXPORT */
export default BASE_CONFIG;
