module.exports = {
    packageJson() {
        this.addDependencies(
            'angular',
            'angular-ui-router'
        );

        this.addDevDependencies(
            'angular-mocks',
            'browserify-ng-html2js',
            'gulp-jade',
            'gulp-ext-replace'
        );

        this.appendPackageJson({
            'scripts': {
                'create-public-symlink': './scripts/npm/create-public-symlink.sh',
                'postinstall': this.updateNpmScript('postinstall', 'npm run create-public-symlink'),
            },
        });
    },
};
