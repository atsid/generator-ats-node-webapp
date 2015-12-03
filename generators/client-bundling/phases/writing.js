module.exports = {
  packageJson() {
    this.addDependencies();
    this.addDevDependencies(
      'webpack',
      'webpack-dev-middleware',
      'webpack-hot-middleware',
      'react-transform',
      'react-transform-hmr',
      'react-transform-catch-errors',
      'redbox-react'
    );
  },
};
