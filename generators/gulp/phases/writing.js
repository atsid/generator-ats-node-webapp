module.exports = {
    packageJson() {
        this.addDevDependencies(
            'gulp',
            'gulp-empty',
            'gulp-exit',
            'gulp-istanbul',
            'gulp-mocha',
            'gulp-util',
            'run-sequence',
            'vinyl-buffer',
            'vinyl-source-stream',
            'isparta');
        this.appendPackageJson({
            'scripts': {
                'test': 'gulp',
                'develop': 'gulp develop',
            },
        });
    },
};
