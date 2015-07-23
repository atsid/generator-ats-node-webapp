require('babel/register');
module.exports = require('../../util/common-generator').generator(__dirname, {
    end: require('./phases/install'),
});
