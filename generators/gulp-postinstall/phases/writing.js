module.exports = {
    packageJson() {
        this.updateNpmScript('postinstall', 'gulp');
    },
};
