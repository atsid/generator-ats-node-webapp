const config = require('config');

module.exports = {
  name: 'webpack hot-loader',
  configure(app) {
    if (config.server.webpackHotLoader === 1) {
      const webpack = require('webpack');
      const webpackConfig = require('../../../webpack.config.dev');
      const compiler = webpack(webpackConfig);

      app.use(require('webpack-dev-middleware')(compiler, {noInfo: true}));
      app.use(require('webpack-hot-middleware')(compiler));
    }
  },
};
