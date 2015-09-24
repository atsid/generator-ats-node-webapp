const os = require('os');
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const yoAssert = require('yeoman-generator').assert;
const helpers = require('yeoman-generator').test;
const {expect, assert} = require('chai');
const debug = require('debug')('gentest');

describe('generator-ats-node-webapp:app', function () {
  let context = null;

  before(function (done) {
    this.timeout(60000);
    context = helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({
        skipInstall: true,
        client: 'react',
        server: 'full',
        oauthStrategies: ['google', 'facebook', 'twitter', 'github']
      })
      .on('end', done);
  });

  it('creates files', function () {
    yoAssert.file([
      'index.js',
      'package.json',
      '.editorconfig',
      '.eslintrc',
      '.gitignore',
      '.nodemonignore',
      '.gitattributes',
      'README.md',
      'client/app.js'
    ]);
  });

  function generateProject(client, server, cb) {
    context.inTmpDir((dir) => {
      debug('Temp Dir: ', dir);
      helpers.run(path.join(__dirname, '../generators/app'))
        .inDir(dir)
        .withOptions({skipInstall: true, client: client, server: server})
        .on('end', () => {
          fs.symlinkSync(path.join(__dirname, '../node_modules'), path.join(dir, 'node_modules'));
          cb();
        });
    });
  }

  function checkExecOutput(done, test) {
    return (err, stdout, stderr) => {
      if (err) {
        done(err);
      } else {
        const out = '' + stdout;
        const errs = '' + stderr;
        expect(errs).to.equal('');
        if (out.indexOf(test) == -1) {
          console.error(out);
          assert.fail('Execution Failed');
        }

        expect(out.indexOf(test)).to.be.greaterThan(-1);
        done();
      }
    };
  }

  const BUNDLE_DONE = 'Finished \'bundle-client\' after';
  const LINT_DONE = 'Finished \'lint\' after';

  it('can create a lintable React fullstack project', function (done) {
    this.timeout(30 * 1000);
    generateProject('react', 'full', () => {
      exec('npm run create-app-symlink && gulp lint bundle-client', checkExecOutput(done, BUNDLE_DONE));
    });
  });

  it('can create a lintable Angular fullstack project', function (done) {
    this.timeout(30 * 1000);
    generateProject('angular', 'full', () => {
      exec('npm run create-app-symlink && npm run create-public-symlink && gulp lint', checkExecOutput(done, LINT_DONE));
    });
  });

  it('can create a lintable React client-only project', function (done) {
    this.timeout(30 * 1000);
    generateProject('react', 'thin', () => {
      exec('gulp lint bundle-client', checkExecOutput(done, BUNDLE_DONE));
    });
  });

  it('can create a lintable Angular client-only project', function (done) {
    this.timeout(30 * 1000);
    generateProject('angular', 'thin', () => {
      exec('npm run create-public-symlink && gulp lint', checkExecOutput(done, LINT_DONE));
    });
  });
});
