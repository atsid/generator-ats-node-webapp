module.exports = {
    packageJson() {
        this.appendPackageJson({
            dependencies: {
                'passport-github2': '^0.1.9',
            },
        });
    },
};
