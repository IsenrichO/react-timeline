
module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    require('autoprefixer'),
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-discard-comments')({
      removeAll: true
    }),
    require('postcss-strip-inline-comments'),
    require('postcss-flexbugs-fixes'),
    require('postcss-selector-matches'),
    require('postcss-will-change')
  ]
};
