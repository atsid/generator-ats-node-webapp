module.exports = {
  packageJson() {
    this.addDevDependencies(
      'gulp-eslint',
      'babel-eslint',
      'eslint-config-airbnb',
      'eslint-plugin-react'
    );
  },
};
