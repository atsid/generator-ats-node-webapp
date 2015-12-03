module.exports = {
  packageJson() {
    this.addDependencies(
      'angular',
      'angular-ui-router'
    );

    this.addDevDependencies(
      'angular-mocks'
    );
  },
};
