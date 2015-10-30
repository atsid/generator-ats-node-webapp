module.exports = {
  packageJson() {
    this.addDependencies(
      'angular',
      'angular-ui-router'
    );

    this.addDevDependencies(
      'angular-mocks',
      'browserify-ng-html2js'
    );
    this.addBrowserifyShim('angular', 'global:angular');
  },
};
