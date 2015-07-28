const _ = require('lodash');
const debug = require('debug')('generator-ats-node-webapp:app');

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
        const useOAuthStrategy = (name) => (this.props.oauthStrategies || []).indexOf(name) > -1;
        this.props.useOAuthStrategy = useOAuthStrategy;
        debug('generating application with properties', this.props);

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

        if (useOAuthStrategy('facebook')) {
            composeLocal('auth-facebook');
        }
        if (useOAuthStrategy('github')) {
            composeLocal('auth-github');
        }
        if (useOAuthStrategy('google')) {
            composeLocal('auth-google');
        }
        if (useOAuthStrategy('twitter')) {
            composeLocal('auth-twitter');
        }

        if (this.props.client === 'react') {
            composeLocal('client-react');
        } else if (this.props.client === 'angular') {
            composeLocal('client-angular');
        }

        composeLocal('gulp-postinstall');
    },
};
