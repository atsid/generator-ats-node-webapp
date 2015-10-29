module.exports = {
  packageJson() {
    this.addDependencies(
      'body-parser',
      'compression',
      'cookie-parser',
      'cookie-session',
      'express-cache-response-directive',
      'express-jefferson',
      'express-mountie',
      'hat',
      'helmet',
      'mr-cluster',
      'passport',
      'passport-local'
    );

    this.addDevDependencies(
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
