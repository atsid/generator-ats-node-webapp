const yeoman = require('yeoman-generator');
const _ = require('lodash');

module.exports = {
    generator(path, phaseConfig) {
        const defaultConfig = {
            constructor: function ctor() {
                yeoman.generators.Base.apply(this, arguments);
            },
            initializing: require('./phases/initializing'),
            writing: require('./phases/writing')(path),
        };
        const config = _.merge(defaultConfig, phaseConfig);
        return yeoman.generators.Base.extend(config);
    },
};
