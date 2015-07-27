module.exports = {
    packageJson() {
        this.addDevDependencies(
            'babelify',
            'mkdirp',
            'browserify',
            'envify',
            'uglifyify',
            'watchify',
            'jsdom',
            'gulp-livereload');

        // React-Specific build dependencies
        if (this.props.client === 'react') {
            this.addDevDependency('livereactload');
        }
    },
};
