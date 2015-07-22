'use strict';
require('babel/register');
module.exports = require('../../util/common-generator').generator(__dirname, {
    writing: require('./phases/writing')
});
