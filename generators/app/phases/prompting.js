const _ = require('lodash');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

function isOAuthSupported(options) {
  return options.server !== 'thin';
}

module.exports = {
  welcome() {
    this.log(yosay(
      'Welcome to the incredible ' + chalk.red('ATS NodeJS') + ' generator!'
    ));
  },

  askForModuleName() {
    const done = this.async();
    const prompts = [{
      name: 'name',
      message: 'Module Name',
      'default': this.options.name || path.basename(process.cwd()),
      filter: _.kebabCase,
      validate: (input) => input.length ? true : false,
      when: !this.pkg.name && !this.options.name,
    }];
    this.prompt(prompts, (props) => {
      if (props.askAgain) {
        return this.prompting.askForModuleName.call(this);
      }
      this.props = _.extend(this.props, props);
      done();
    });
  },

  askFor() {
    const done = this.async();
    const prompts = [{
      name: 'description',
      message: 'Description',
      'default': this.pkg.description,
      when: !this.pkg.description,
    }, {
      name: 'homepage',
      message: 'Project homepage url',
      'default': this.pkg.homepage,
      when: !this.pkg.homepage,
    }, {
      name: 'githubAccount',
      message: 'GitHub username or organization',
      when: !this.pkg.repository,
    }, {
      name: 'authorName',
      message: 'Author\'s Name',
      when: !this.pkg.author,
      store: true,
    }, {
      name: 'authorEmail',
      message: 'Author\'s Email',
      when: !this.pkg.author,
      store: true,
    }, {
      name: 'authorUrl',
      message: 'Author\'s Homepage',
      when: !this.pkg.author,
      store: true,
    }, {
      name: 'keywords',
      message: 'Key your keywords (comma to split)',
      when: !this.pkg.keywords,
      filter: _.words,
    }, {
      name: 'client',
      message: 'Client Framework',
      type: 'list',
      'default': (val) => val || 'react',
      choices: [
        {name: 'React', value: 'react'},
        {name: 'Angular', value: 'angular'},
      ],
      when: !this.options.client,
    }, {
      name: 'server',
      message: 'Server Type',
      type: 'list',
      'default': (val) => val || 'full',
      choices: [
        {name: 'Full Server', value: 'full'},
        {name: 'Thin Server (dev only)', value: 'thin'},
      ],
      when: !this.options.server,
    }, {
      type: 'checkbox',
      message: 'OAuth Strategies',
      name: 'oauthStrategies',
      choices: [
        {name: 'Google', value: 'google', checked: true},
        {name: 'Github', value: 'github', checked: true},
        {name: 'Facebook', value: 'facebook', checked: true},
        {name: 'Twitter', value: 'twitter', checked: true},
        {name: 'LinkedIn', value: 'linkedin', checked: true},
      ],
      when: isOAuthSupported(this.options) && !this.options.oauthStrategies,
    }];

    this.prompt(prompts, (props) => {
      this.props = _.extend(this.props, props);

      if (props.githubAccount) {
        this.props.repository = props.githubAccount + '/' + this.props.name;
      }

      done();
    });
  },
};
