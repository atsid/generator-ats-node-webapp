module.exports = {
  packageJson() {
    this.addDependencies(
      'babel',
      'bcrypt',
      'bluebird',
      'body-parser',
      'coffee-script',
      'compression',
      'config',
      'cookie-parser',
      'cookie-session',
      'debug',
      'jade',
      'express',
      'express-cache-response-directive',
      'express-jefferson',
      'express-mountie',
      'hat',
      'helmet',
      'lodash',
      'mongoose',
      'mongoose-organizer',
      'mongoose-q',
      'mr-cluster',
      'passport',
      'passport-local',
      'q-bluebird'
    );

    this.addDevDependencies(
      'chai',
      'gulp-nodemon',
      'rewire',
      'supertest',
      'supertest-session'
    );

    this.updateNpmScript('pretest', 'npm run create-app-symlink');
    this.updateNpmScript('prerun', 'npm run create-app-symlink');
    this.updateNpmScript('start', 'DEBUG=app*,jefferson* node index');

    this.appendPackageJson({
      files: ['server', 'config'],
    });
  },
};
