require('babel/register');
module.exports = require('../../util/common-generator').generator(__dirname, {
    prompting: require('./phases/prompting'),
    writing: require('./phases/writing'),
    install: require('./phases/install'),
});
