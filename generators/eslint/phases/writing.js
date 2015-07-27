module.exports = {
    packageJson() {
        this.addDevDependencies(
                'gulp-eslint',
                'babel-eslint',
                'eslint-plugin-react'
        );
    },
};
