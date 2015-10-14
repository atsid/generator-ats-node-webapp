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
      debug('composing with generator', name);
      this.composeWith(`ats-node-webapp:${name}`, {options: this.props}, {local: require.resolve(`../../${name}`)});
    };
    const useOAuthStrategy = (name) => (this.props.oauthStrategies || []).indexOf(name) > -1;
    const composeOAuth = (name) => {
      if (useOAuthStrategy(name)) {
        composeLocal(`auth-${name}`);
      }
    };

    this.props.useOAuthStrategy = useOAuthStrategy;
    debug('generating application with properties', this.props);

    composeLocal('skeleton');
    composeLocal(`server-${this.props.server}`);
    if (this.props.server !== 'thin') {
      composeLocal('app-symlink');
    }

    // Add Server Components
    if (this.props.server === 'full') {
      // Add OAuth Generators
      composeOAuth('facebook');
      composeOAuth('github');
      composeOAuth('google');
      composeOAuth('twitter');
      composeOAuth('linkedin');

      // Add Persistence
      composeLocal('persistence-mongodb');
    }

    // Add Client
    composeLocal(`client-${this.props.client}`);
  },
};
