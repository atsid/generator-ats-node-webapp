module.exports = {
  packageJson() {
    this.addDependencies(
      'react',
      'react-router',
      'material-ui',
      'history',
      'react-tape-event-plugin',
      'babel-preset-react'
    );
    this.addDevDependency('nock');
    this.appendPackageJson({'browserify-shim': {}});
  },
};
