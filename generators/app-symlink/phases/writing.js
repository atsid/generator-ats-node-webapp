module.exports = {
  packageJson() {
    this.updateNpmScript('postinstall', 'npm run create-app-symlink');
    this.updateNpmScript('create-app-symlink', './scripts/npm/create-app-symlink.sh');
  },
};
