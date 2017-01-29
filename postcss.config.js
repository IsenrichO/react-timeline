
module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    require('autoprefixer'),
    require('postcss-import'),
    require('postcss-nested')
  ]
};
