module.exports = {
  packageJson() {
    this.addDependencies(
      'react',
      'react-dom',
      'react-router',
      'material-ui',
      'history',
      'react-tap-event-plugin'
    );
    this.addDevDependencies(
      'nock',
      'react-addons-test-utils',

      // Build Support
      'react-transform',
      'react-transform-hmr',
      'react-transform-catch-errors',
      'redbox-react',
      'eslint-plugin-react',
      'babel-plugin-react-transform'
    );
  },
};
