module.exports = {
    packageJson() {
        this.appendPackageJson({
            'scripts': {
                'create-public-symlink': './scripts/npm/create-public-symlink.sh',
                'postinstall': this.updateNpmScript('pretest', 'npm run create-public-symlink'),
            },
            'dependencies': {
                'angular': '^1.4.3',
                'angular-ui-router': '^0.2.15',
            },
            'devDependencies': {
                'browserify-ng-html2js': '^1.1.2',
                'gulp-jade': '^1.0.1',
                'gulp-ext-replace': '^0.2.0',
            },
        });
    },
};
