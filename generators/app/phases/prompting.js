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
        },{
            name: 'twitterAuth',
            message: 'Include Twitter OAuth?',
            type: 'confirm'
        },{
            name: 'facebookAuth',
            message: 'Include Facebook OAuth?',
            type: 'confirm'
        }/*{
            name: 'client',
            message: 'Client Framework',
            type: 'list',
            default: (val) => val || 'none',
            choices: [
                { name: 'None', value: 'none'},
                { name: 'React+Flux', value: 'reactflux'},
                { name: 'Angular', value: 'angular'}
            ]
        },{
            name: 'citool',
            message: 'Continuous Integration Tool',
            type: 'list',
            default: (val) => val || 'travis',
            choices: [
                { name: 'Wercker', value: 'wercker' },
                { name: 'Travis', value: 'travis'}
            ]
        }*/];

        this.prompt(prompts, (props) => {
            this.props = _.extend(this.props, props);

            if (props.githubAccount) {
                this.props.repository = props.githubAccount + '/' + this.props.name;
            }

            done();
        });
    }
};
