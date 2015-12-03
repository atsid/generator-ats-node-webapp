const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, 'client'),
  devtool: 'source-map',
  entry: {
    app: './app'
  },
  output: {
    path: path.join(__dirname, 'www'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {test: /\/client\/.*\.js$/, loader: 'babel'},
      {test: /\.scss$/, loader: 'style!css!sass'},
      {test: /\.css/, loader: 'style!css'}
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  resolve: {
    extensions: ['', '.js'],
    alias: {
    }
  }
};
