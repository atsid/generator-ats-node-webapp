module.exports = {
    packageJson() {
        this.appendPackageJson({
            dependencies: {
                'passport-google-oauth': '^0.2.0',
            },
        });
    },
};
