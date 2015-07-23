module.exports = {
    packageJson() {
        this.appendPackageJson({
            'dependencies': {
                'angular': '^1.4.3',
                'angular-ui-router': '^0.2.15',
            },
            'devDependencies': {
                'babelify': '^6.1.3',
                'browserify': '^10.2.6',
                'envify': '^3.4.0',
                'uglifyify': '^3.0.1',
                'watchify': '^3.2.3',
                'jsdom': '^3.x',
            },
        });
    },
};
