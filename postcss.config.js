module.exports = {
  ident: 'postcss',
  plugins: [
    require('autoprefixer'),
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-discard-comments')({
      removeAll: true,
    }),
    require('postcss-strip-inline-comments'),
    require('postcss-flexbugs-fixes'),
    require('postcss-selector-matches'),
    require('postcss-will-change'),
  ],
  stringifier: 'midas',
  syntax: 'postcss-scss',
};
