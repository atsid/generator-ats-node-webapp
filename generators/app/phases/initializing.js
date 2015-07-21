module.exports = function () {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    this.props = {
        name: this.pkg.name,
        description: this.pkg.description,
        version: this.pkg.version,
        homepage: this.pkg.homepage,
        repository: this.pkg.repository,
        babel: Boolean(this.options.babel)
    };
};
