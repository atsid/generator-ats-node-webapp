module.exports = {
  packageJson() {
    this.addDependencies(
      'babel',
      'bcryptjs',
      'bluebird',
      'coffee-script',
      'config',
      'debug',
      'jade',
      'express',
      'lodash'
    );

    this.addDevDependencies(
      'chai',
      'gulp-nodemon'
    );
  },
};
