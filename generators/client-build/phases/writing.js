module.exports = {
  packageJson() {
    this.addDevDependencies(
      'babelify',
      'mkdirp',
      'browserify',
      'browserify-shim',
      'envify',
      'uglifyify',
      'watchify',
      'jsdom',
      'gulp-livereload');

    // React-Specific build dependencies
    if (this.props.client === 'react') {
      this.addDevDependency('livereactload');
    }
  },
};
