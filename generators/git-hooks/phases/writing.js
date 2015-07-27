module.exports = {
    packageJson() {
        this.updateNpmScript('postinstall', 'npm run install-git-hooks');
        this.updateNpmScript('install-git-hooks', './scripts/npm/install-git-hooks.sh');
    },
};
