module.exports = {
    packageJson() {
        this.appendPackageJson({
            "scripts": {
                "install-git-hooks": "./scripts/npm/install-git-hooks.sh",
                "postinstall": this.updateNpmScript("postinstall", "npm run install-git-hooks")
            }
        });
    }
};
