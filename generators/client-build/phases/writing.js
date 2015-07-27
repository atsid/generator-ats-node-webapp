module.exports = {
    packageJson() {
        const data = {
            'devDependencies': {
                'babelify': '^6.1.3',
                'browserify': '^10.2.6',
                'envify': '^3.4.0',
                'uglifyify': '^3.0.1',
                'watchify': '^3.2.3',
                'jsdom': '^3.x',
                'gulp-livereload': '^3.8',
            },
        };

        // React-Specific build dependencies
        if (this.props.client === 'react') {
            data.devDependencies.livereactload = '^0.6.0';
        }

        this.appendPackageJson(data);
    },
};
