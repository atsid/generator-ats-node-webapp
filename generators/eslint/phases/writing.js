module.exports = {
    packageJson() {
        this.appendPackageJson({
            "devDependencies": {
                "babel-eslint": "^3.1.23",
                "eslint-plugin-react": "^2.7.1"
            }
        });
    }
};
