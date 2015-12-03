module.exports = {
  packageJson() {
    this.addDependencies(
      'babel',
      'bcryptjs',
      'coffee-script',
      'config',
      'jade',
      'express',
      'lodash',
      'log4js'
    );

    this.addDevDependencies(
      'chai',
      'gulp-eslint',
      'babel-eslint',
      'babel-loader',
      'eslint-config-airbnb',
      'gulp',
      'gulp-livereload',
      'gulp-debug',
      'gulp-rev-all',
      'gulp-awspublish',
      'gulp-cloudfront',
      'gulp-sourcemaps',
      'gulp-cssmin',
      'gulp-imagemin',
      'gulp-jade',
      'gulp-changed',
      'gulp-sass',
      'gulp-empty',
      'gulp-exit',
      'gulp-istanbul',
      'gulp-mocha',
      'gulp-util',
      'gulp-nodemon',
      'gulp-plumber',
      'gulp-webpack',
      'isparta',
      'jsdom',
      'mkdirp',
      'run-sequence',
      'vinyl-buffer',
      'vinyl-source-stream',
      'webpack',
      'webpack-dev-middleware',
      'webpack-hot-middleware'
    );
    this.updateNpmScript('test', 'gulp');
    this.updateNpmScript('develop', 'gulp develop');
    this.updateNpmScript('postinstall', 'npm run install-git-hooks');
    this.updateNpmScript('install-git-hooks', './scripts/npm/install-git-hooks.sh');
    this.updateNpmScript('postinstall', 'npm run create-public-symlink');
    this.updateNpmScript('create-public-symlink', './scripts/npm/create-public-symlink.sh');
  },
};
