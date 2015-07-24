const _ = require('lodash');

module.exports = {
    packageJson() {
        this.appendPackageJson({
            name: _.kebabCase(this.props.name),
            version: this.props.version,
            description: this.props.description,
            homepage: this.props.homepage,
            scripts: {},
            repository: {
                type: 'git',
                url: 'https://github.com/' + this.props.repository,
            },
            bugs: {
                url: 'https://github.com/' + this.props.repository + '/issues',
            },
            author: {
                name: this.props.authorName,
                email: this.props.authorEmail,
                url: this.props.authorUrl,
            },
            files: ['client'],
            keywords: this.props.keywords,
        });
    },

    writeTemplates() {
        // Do Nothing
    },

    subgenerators() {
        const composeLocal = (name) => {
            this.composeWith(`ats-node-webapp:${name}`, {options: this.props}, {local: require.resolve(`../../${name}`)});
        };

        composeLocal('git');
        composeLocal('git-hooks');
        composeLocal('editorconfig');
        composeLocal('eslint');
        composeLocal('readme');
        composeLocal('app-symlink');
        composeLocal('server');
        composeLocal('docker-compose');
        composeLocal('client-assets');
        composeLocal('client-styles');
        composeLocal('client-build');
        composeLocal('gulp');

        if (this.props.twitterAuth) {
            composeLocal('twitter-auth');
        }
        if (this.props.facebookAuth) {
            composeLocal('facebook-auth');
        }
        if (this.props.googleAuth) {
            composeLocal('google-auth');
        }

        if (this.props.client === 'react') {
            composeLocal('client-react');
        } else if (this.props.client === 'angular') {
            composeLocal('client-angular');
        }
    },
};
