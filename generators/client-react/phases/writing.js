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
      'react-addons-test-utils'
    );
    this.appendPackageJson({'browserify-shim': {}});
  },
};
