const _ = require('lodash');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const debug = require('debug')('generator-ats-node-webapp:prompting');

function isOAuthSupported(options) {
  return options.server !== 'thin';
}

function acceptString(value, defaultValue) {
  if (typeof value !== 'string') {
    debug(`string parameter is type "${typeof value}", using default value "${defaultValue}"`);
    return defaultValue;
  }
  const result = value || defaultValue;
  if (typeof result !== 'string') {
    throw new Error(`Could not accept input [${JSON.stringify(value)}], default=${defaultValue}`);
  } else {
    return result;
  }
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
    debug('prompting for input', this.options);
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
      'default': (val) => acceptString(val, 'react'),
      choices: [
        {name: 'React', value: 'react'},
        {name: 'Angular', value: 'angular'},
      ],
      when: !this.options.client,
    }, {
      name: 'server',
      message: 'Server Type',
      type: 'list',
      'default': (val) => acceptString(val, 'full'),
      choices: [
        {name: 'Full Server', value: 'full'},
        {name: 'Thin Server (dev only)', value: 'thin'},
      ],
      when: !this.options.server,
    }, {
      name: 'database',
      message: 'Database Type',
      type: 'list',
      'default': (val) => acceptString(val, 'mongodb'),
      choices: [
        {name: 'MongoDB', value: 'mongodb'},
        {name: 'Sequelize (MySQL)', value: 'sequelize'},
      ],
      when: this.options.server === 'full' && !this.options.database,
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
