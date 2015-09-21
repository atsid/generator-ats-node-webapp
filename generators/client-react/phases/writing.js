module.exports = {
  packageJson() {
    this.addDependency('react');
    this.addBrowserifyShim('react', 'global:React');
  },
};
