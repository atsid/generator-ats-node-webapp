module.exports = function end() {
    if (!this.fs.exists('.git')) {
        this.spawnCommand('git', ['init']);
        if (!this.options.repositoryPath) {
            const repositoryPath = `${this.props.githubAccount}/${this.props.name}`;
            const repoSSH = 'git@github.com:' + repositoryPath + '.git';
            this.spawnCommand('git', ['remote', 'add', 'origin', repoSSH]);
        }
    }
};
