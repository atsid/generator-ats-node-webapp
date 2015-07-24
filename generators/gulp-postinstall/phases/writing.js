module.exports = {
    packageJson() {
        this.appendPackageJson({
            scripts: {
                postinstall: this.updateNpmScript('postinstall', 'gulp'),
            },
        });
    },
};
