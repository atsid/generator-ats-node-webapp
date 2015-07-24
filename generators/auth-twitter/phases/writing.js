module.exports = {
    packageJson() {
        this.appendPackageJson({
            dependencies: {
                'passport-twitter': '^1.0.3',
            },
        });
    },
};
