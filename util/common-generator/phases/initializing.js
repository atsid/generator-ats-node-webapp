const parseAuthor = require('parse-author');
const _ = require('lodash');
const generatorPkg = require('../../../package.json');

const packageVersion = (name) => generatorPkg.dependencies[name] || generatorPkg.devDependencies[name];

/**
 * A private helper to read data in package.json
 */
function readPackageJson() {
  let result = {};
  if (this.fs.exists('package.json')) {
    result = this.fs.readJSON('package.json');
  }
  return result;
}

/**
 * A private helper to append data to package.json
 */
function appendPackageJson(data) {
  this.fs.writeJSON('package.json', _.merge(this.readPackageJson(), data));
}

/**
 * A private helper to add dependency to package.json
 * @param name
 */
function addDependency(name) {
  this.appendPackageJson({dependencies: {[name]: packageVersion(name)}});
}

/**
 * A private helper to add dependency to package.json
 * @param name
 */
function addDevDependency(name) {
  this.appendPackageJson({devDependencies: {[name]: packageVersion(name)}});
}

/**
 * A private helper to add multiple dependencies
 * @param names
 */
function addDependencies(...names) {
  names.forEach(this.addDependency);
}

/**
 * A private helper to add multiple dev dependencies
 * @param names
 */
function addDevDependencies(...names) {
  names.forEach(this.addDevDependency);
}

function addBrowserifyShim(key, value) {
  this.appendPackageJson({'browserify-shim': {[key]: value}});
}

/**
 * A private helper to update an NPM Script
 * @param name The name of the script section (e.g. postinstall, pretest)
 * @param data The script data (e.g. 'gulp', 'npm run my-task')
 * @returns {*} The updated script section
 */
function updateNpmScript(name, data) {
  const pkg = this.readPackageJson();
  const existing = pkg.scripts && pkg.scripts[name];

  let result = null;
  // If this script section is already present, don't modify the script
  if (existing) {
    if (existing.indexOf(data) > -1) {
      result = existing;
    } else {
      result = `${existing} && ${data}`;
    }
  } else {
    result = data;
  }

  this.appendPackageJson({scripts: {[name]: result}});
}

module.exports = {
  addPrivateHelpers() {
    this.readPackageJson = readPackageJson.bind(this);
    this.appendPackageJson = appendPackageJson.bind(this);
    this.addDependency = addDependency.bind(this);
    this.addDevDependency = addDevDependency.bind(this);
    this.addDependencies = addDependencies.bind(this);
    this.addDevDependencies = addDevDependencies.bind(this);
    this.updateNpmScript = updateNpmScript.bind(this);
    this.addBrowserifyShim = addBrowserifyShim.bind(this);
  },

  scanPackageJson: function scanPackageJson() {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    if (_.isString(this.options.oauthStrategies)) {
      this.options.oauthStrategies = this.options.oauthStrategies.split(',');
    }

    // Pre set the default props from the information we have at this point
    this.props = _.merge((this.options || {}), {
      name: this.pkg.name,
      description: this.pkg.description,
      version: this.pkg.version || '0.0.0',
      homepage: this.pkg.homepage,
      repository: this.pkg.repository,
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
  },
};
