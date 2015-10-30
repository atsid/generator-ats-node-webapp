module.exports = {
  packageJson() {
    this.addDependency('react');
    this.addDependency('react-router');
    this.addDependency('material-ui');
    this.addDependency('history');
    this.addDependency('react-tap-event-plugin');
    this.addDevDependency('nock');
    this.appendPackageJson({'browserify-shim': {}});
  },
};
