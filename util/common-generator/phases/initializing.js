const parseAuthor = require('parse-author');
const _ = require('lodash');

module.exports = {
    addPrivateHelpers() {
        /**
         * A private helper to read data in package.json
         */
        this.readPackageJson = () => {
            if (this.fs.exists('package.json')) {
                return this.fs.readJSON('package.json')
            } else {
                return {};
            }
        };

        /**
         * A private helper to append data to package.json
         */
        this.appendPackageJson = (data) => {
            this.fs.writeJSON("package.json", _.merge(this.readPackageJson(), data));
        };

        /**
         * A private helper to update an NPM Script
         * @param name The name of the script section (e.g. postinstall, pretest)
         * @param data The script data (e.g. 'gulp', 'npm run my-task')
         * @returns {*} The updated script section
         */
        this.updateNpmScript = (name, data) => {
            const pkg = this.readPackageJson();
            let existing = pkg.scripts && pkg.scripts[name];

            // If this script section is already present, don't modify the script
            if (existing) {
                if (existing.indexOf(data) > -1) {
                    return existing;
                } else {
                    return `${existing} && ${data}`
                }
            } else {
                return data;
            }
        }
    },

    scanPackageJson: function () {
        this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

        // Pre set the default props from the information we have at this point
        this.props = _.merge((this.options || {}), {
            name: this.pkg.name,
            description: this.pkg.description,
            version: this.pkg.version || '0.0.0',
            homepage: this.pkg.homepage,
            repository: this.pkg.repository
        });

        // The author field can also be a string, we're ignoring this case currently.
        if (_.isObject(this.pkg.author)) {
            this.props.authorName = this.pkg.author.name;
            this.props.authorEmail = this.pkg.author.email;
            this.props.authorUrl = this.pkg.author.url;
        }

        if (_.isString(this.pkg.author)) {
            const info = parseAuthor(this.pkg.author);
            this.props.authorName = info.name;
            this.props.authorEmail = info.email;
            this.props.authorUrl = info.url;
        }
    }
};
