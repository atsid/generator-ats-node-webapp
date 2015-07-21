const _ = require('lodash');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

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
            default: path.basename(process.cwd()),
            filter: _.kebabCase,
            validate: (input) => input.length ? true : false,
            when: !this.pkg.name
        }];
        this.prompt(prompts, (props) => {
            if (props.askAgain) {
                return this.prompting.askForModuleName.call(this);
            }
            this.props = _.extend(this.props, props);
            done();
        });
    },

    askFor () {
        const done = this.async();
        const prompts = [{
            name: 'description',
            message: 'Description',
            default: this.pkg.description,
            when: !this.pkg.description
        }, {
            name: 'homepage',
            message: 'Project homepage url',
            default: this.pkg.homepage,
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

        this.prompt(prompts, (props) => {
            this.props = _.extend(this.props, props);

            if (props.githubAccount) {
                this.props.repository = props.githubAccount + '/' + this.props.name;
            }

            done();
        });
    }
};
