var _ = require('lodash');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = {
  welcome: function() {
    this.log(yosay(
      'Welcome to the incredible ' + chalk.red('ATS MERN stack') + ' generator!'
    ));
  },
  askForModuleName: function () {
    var self = this;
    var done = this.async();

    var prompts = [{
      name: 'name',
      message: 'Module Name',
      default: path.basename(process.cwd()),
      filter: _.kebabCase,
      validate: function (input) {
        return input.length ? true : false;
      },
      when: !this.pkg.name
    }];

    this.prompt(prompts, function (props) {
      if (props.askAgain) {
        return this.prompting.askForModuleName.call(this);
      }
      this.props = _.extend(this.props, props);
      done();
    }.bind(this));
  },

  askFor: function () {
    var done = this.async();

    var prompts = [{
      name: 'description',
      message: 'Description',
      when: !this.pkg.description
    }, {
      name: 'homepage',
      message: 'Project homepage url',
      when: !this.pkg.homepage
    }, {
      name: 'githubAccount',
      message: 'GitHub username or organization',
      when: !this.pkg.repository
    }, {
      name: 'authorName',
      message: 'Author\'s Name',
      when: !this.pkg.author,
      store: true
    }, {
      name: 'authorEmail',
      message: 'Author\'s Email',
      when: !this.pkg.author,
      store: true
    }, {
      name: 'authorUrl',
      message: 'Author\'s Homepage',
      when: !this.pkg.author,
      store: true
    }, {
      name: 'keywords',
      message: 'Key your keywords (comma to split)',
      when: !this.pkg.keywords,
      filter: _.words
    }];

    this.prompt(prompts, function (props) {
      this.props = _.extend(this.props, props);

      if (props.githubAccount) {
        this.props.repository = props.githubAccount + '/' + this.props.name;
      }

      done();
    }.bind(this));
  }
};
