var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');

var baseConfig = require('./base');

var config = _.merge({
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:8000',
    'webpack/hot/only-dev-server',
    'babel/polyfill',
    './src/app'
  ],
  cache: true,
  devtool: 'eval',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
}, baseConfig);

// Add needed loaders
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader?stage=0',
  include: path.join(__dirname, '/../src')
});

module.exports = config;
