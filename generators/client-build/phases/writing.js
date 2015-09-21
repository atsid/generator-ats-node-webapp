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
      'gulp-livereload',
      'gulp-rev-all',
      'gulp-awspublish',
      'gulp-cloudfront',
      'gulp-jade'
    );

    // React-Specific build dependencies
    if (this.props.client === 'react') {
      this.addDevDependency('livereactload');
    }
  },
};
