module.exports = function end() {
    if (!this.fs.exists(".git")) {
        this.spawnCommand('git', ['init']);
        if (!this.options.repositoryPath) {
            const repositoryPath = `${this.props.githubAccount}/${this.props.name}`;
            console.log("Repository Path: ", repositoryPath);
            var repoSSH = 'git@github.com:' + this.props.repositoryPath + '.git';
            this.spawnCommand('git', ['remote', 'add', 'origin', repoSSH]);
        }
    }
};
