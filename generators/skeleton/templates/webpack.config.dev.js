const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, 'client'),
  devtool: 'eval',
  entry: {
    app: [
      'webpack-hot-middleware/client',
      path.join(__dirname, 'client', 'app')
    ]
  },
  output: {
    path: path.join(__dirname, 'www'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\/client\/.*\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'client'),
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
};
