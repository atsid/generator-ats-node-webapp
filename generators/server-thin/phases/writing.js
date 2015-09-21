module.exports = {
  packageJson() {
    this.updateNpmScript('start', 'DEBUG=app* node index');
  },
};
