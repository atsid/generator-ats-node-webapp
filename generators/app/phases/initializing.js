module.exports = function () {
  this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

  // Pre set the default props from the information we have at this point
  this.props = {
    name: this.pkg.name,
    description: this.pkg.description,
    version: this.pkg.version,
    homepage: this.pkg.homepage,
    repository: this.pkg.repository,
    babel: Boolean(this.options.babel)
  };
};
