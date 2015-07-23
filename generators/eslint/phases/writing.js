module.exports = {
    packageJson() {
        this.appendPackageJson({
            'devDependencies': {
                'gulp-eslint': '^0.15.0',
                'babel-eslint': '^3.1.23',
                'eslint-plugin-react': '^2.7.1',
            },
        });
    },
};
