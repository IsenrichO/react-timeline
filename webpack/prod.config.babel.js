// Webpack Plugins:
import { HashedModuleIdsPlugin }                from 'webpack';

// import BrotliCompressionPlugin from 'brotli-webpack-plugin';
import CompressionPlugin                        from 'compression-webpack-plugin';
import ExtractTextPlugin                        from 'extract-text-webpack-plugin';
import ImageMinMozJpeg                          from 'imagemin-mozjpeg';
import ImageMinPlugin                           from 'imagemin-webpack-plugin';
import ImageSvgo                                from 'imagemin-svgo';
import LodashModuleReplacementPlugin            from 'lodash-webpack-plugin';
import UglifyJsPlugin                           from 'uglifyjs-webpack-plugin';
import ZopfliPlugin                             from 'zopfli-webpack-plugin';

// PWA Manifest Webpack Plugins:
import FaviconsWebpackPlugin                    from 'favicons-webpack-plugin';
import WebappManifestPlugin, { FAVICON_PLUGIN } from 'webapp-manifest-plugin';

// Shared Resources:
import {
  cssLoaderOpts,
  invokeLoader,
  isProdEnv,
  PWA_MANIFEST_DATA,
  resolve,
  STATS_MODE,
}                                               from './common';

/* PROD-SPECIFIC CONFIG PARTS */
export const UGLIFY_OPTS = {
  compress: {
    dead_code: true,
    drop_console: true,
    drop_debugger: true,
    ecma: 6,
    unsafe: false,
    unused: true,
    warnings: false, // Suppress uglification warnings
  },
  ecma: 8,
  ie8: false,
  output: {
    beautify: false,
    comments: false,
    keep_quoted_props: true,
    quote_style: 3,
    semicolons: true,
    shebang: true,
    webkit: true,
  },
  parse: {
    bare_returns: false,
    ecma: 8,
    html5_comments: true,
    shebang: true,
  },
  sourcemap: false,
  warnings: false,
};

/* PRODUCTION ENVIRONMENT CONFIGURATION SETTINGS */
const PROD_CONFIG = {
  module: {
    rules: [{
      test: /\.css$/i,
      use: ExtractTextPlugin.extract({
        fallback: 'style',
        use: [
          invokeLoader('css'),
        ],
      }),
    }, {
      test: /\.less$/i,
      use: ExtractTextPlugin.extract({
        fallback: 'style',
        use: [
          invokeLoader('css'),
          'less',
        ],
      }),
    }, {
      test: /\.s(a|c)ss$/i,
      use: ExtractTextPlugin.extract({
        fallback: 'style',
        use: [
          invokeLoader('css', cssLoaderOpts({ url: false })),
          // parser: 'postcss-js', // Enable for parsing of CSS-In-JS compiled styles
          invokeLoader('postcss', { sourceMap: false }),
          invokeLoader('sass', { sourceMap: false }),
        ],
      }),
    }],
  },
  plugins: [
    /**
     * Compress assets into .gz files, so that our Express static handler can serve those instead
     * of the full-sized version. In contrast to the `compression-webpack-plugin`, it leverages
     * the `Node-Zopfli` package and its underlying compression mechanics to achieve very good zlib
     * or deflate compression, albeit at the expense of speed.
     */
    new ZopfliPlugin({
      algorithm: 'zopfli',
      asset: '[path].gz[query]',
      deleteOriginalAssets: true,
      minRatio: 0.99,
      test: /[^favicons-].+\.(jsx?|css|html|map)$/i,
      threshold: 10240,
    }),

    /**
     * This plugin prepares compressed versions of assets to serve them with Content-Encoding. With
     * it, we compress static assets to their GZipped `*.gz` equivalents, so that our Express
     * instance can instead serve those static assets preferentially to their full-sized ones.
     */
    new CompressionPlugin({
      algorithm: 'gzip',
      asset: '[path].gz[query]',
      cache: true,
      deleteOriginalAssets: true,
      exclude: /[^favicons-].*\..+$/i,
      filename(asset) { return asset; },
      include: /.*\.bundle\.js/i,
      minRatio: 0.80,
      test: /.+\.(jsx?|css|html|map)$/i,
      threshold: 10240,
    }),

    /**
     * Enable the newer Brotli compression standard to generate `*.br` files. Though support isn't
     * shared among all major browsers, the more broadly supported GZip is likewise enabled as a
     * fallback below:
     */
    // new BrotliCompressionPlugin({
    //   asset: '[path].br[query]',
    //   deleteOriginalAssets: true,
    //   minRatio: 0.80,
    //   test: /\.js$|\.css$|\.html$|\.map$/i,
    //   threshold: 10240,
    // }),

    /**
     * This plugin will cause hashes to be based on the relative path of the module, generating a
     * four-character string as the module id. As with the `NamedModulesPlugin`, it does add some
     * overhead in terms of the time needed to run. Unlike it, however, this plugin is suggested
     * for use in production.
     */
    new HashedModuleIdsPlugin({
      hashDigest: 'base64', // <`base64` | `hex` | `latin1`>
      hashDigestLength: 4,
      hashFunction: 'sha256', // <`md5` | `sha256` | `sha512`>
    }),

    /**
     * Create smaller Lodash builds by replacing feature sets of modules with `noop`, `identity` or
     * simpler alternatives. This plugin complements `babel-plugin-lodash` by shrinking its cherry-
     * picked builds even further!
     */
    new LodashModuleReplacementPlugin({
      caching: true,
      chaining: true,
      cloning: true,
      collections: true,
      currying: true,
      flattening: true,
      memoizing: true,
      paths: true,
    }),

    /**
     * This plugin is built around and serves as the Webpack counterpart to the `favicons` Node.js
     * module for automating the generation of over 30 (configurable) favicons and their associated
     * file metadata for Android, iOS and the different desktop browsers. It also has excellent
     * third-party integration with the `html-webpack-plugin` to ensure `<link />` tags to the
     * generated favicons are subsequently injected into the output `index.html` file.
     */
    new FaviconsWebpackPlugin({
      background: 'transparent', // Favicon background color
      emitStats: !!STATS_MODE, // Emit all stats of the generated icons
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        windows: false,
        yandex: false,
      },
      inject: true, // Integrate the generated HTML content with `hmtl-webpack-plugin`
      logo: resolve('assets/images/rt-logo.svg'), // Logo path
      // Generate a cache file with control hashes and don't
      // rebuild the favicons until those hashes change:
      persistentCache: true,
      prefix: 'assets/images/favicons-[hash]/', // The prefixed image file folder or name
      statsFilename: 'iconStats-[hash].json', // JSON-format file name for stats file
      title: 'React-Timeline Web App', // Favicon app title
    }),

    new WebappManifestPlugin({
      ...PWA_MANIFEST_DATA,
      icons: FAVICON_PLUGIN,
    }),

    /**
     * This plugin serves as a wrapper around UglifyJS v3 (uglify-es) to minify the project's
     * JavaScript contents. It is the usual method for achieving minification and uglification of
     * one's output bundle in a Webpack build system.
     */
    new UglifyJsPlugin({
      extractComments: true,
      parallel: true,
      test: /\.jsx?$/i,
      uglifyOptions: UGLIFY_OPTS,
    }),

    /**
     * This plugin should run after all other plugins that add or operate on images assets have
     * executed. Because it is built atop the `ImageMin` library, it brings much of the same utility
     * as its underlying library, only suited for the context of a Webpack build pipeline. Its
     * usefulness is manifest in the fact that it can be used to perform image asset optimizations
     * on all images added through any of various different channels.
     */
    new ImageMinPlugin({
      disable: !isProdEnv, // Disable during development
      maxFileSize: Number.MAX_SAFE_INTEGER,
      minFileSize: 1,
      plugins: [
        // An `ImageMin` plugin for MozJpeg, Mozilla's improved JPEG encoder:
        ImageMinMozJpeg({
          progressive: true,
          quality: 99,
        }),

        // An `ImageMin` plugin built atop the plugin-based architecture of the excellent SVGO:
        ImageSvgo({
          plugins: [
            { cleanupAttrs: true }, // Cleanup attributes from newlines, trailing & repeating spaces
            { convertColors: true }, // Convert colors: `rgb()` => `#rrggbb` | `#rrggbb` => `#rgb`
            { minifyStyles: true }, // Minify `<style>` elements' content using CSSO
            { removeComments: true }, // Remove comments
            { removeEmptyAttrs: true }, // Remove element attributes with empty values
            { removeHiddenElems: true }, // Remove hidden elements
            { removeMetadata: true }, // Remove any `<metadata>` tags
            { removeViewBox: false }, // Do not remove the `viewBox` attribute
            { sortAttrs: true }, // Sort element attributes for epic readability
          ],
        }),
      ],
    }),
  ],
  recordsPath: resolve('assets', 'records.json'),
};


/* DEFAULT EXPORT */
export default PROD_CONFIG;
