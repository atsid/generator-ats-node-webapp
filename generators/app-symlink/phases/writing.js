module.exports = {
    packageJson() {
        this.appendPackageJson({
            'scripts': {
                'create-app-symlink': './scripts/npm/create-app-symlink.sh',
                'postinstall': this.updateNpmScript('postinstall', 'npm run create-app-symlink'),
            },
        });
    },
};
