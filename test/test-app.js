'use strict';
var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('generator-ats-node-webapp:app', function () {
    before(function (done) {
        this.timeout(30000);
        helpers.run(path.join(__dirname, '../generators/app'))
            .withOptions({skipInstall: true})
            .on('end', done);
    });

    it('creates files', function () {
        assert.file([
            'package.json',
            '.editorconfig',
            '.eslintrc'
        ]);
    });
});
