const os = require('os');
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const yoAssert = require('yeoman-generator').assert;
const helpers = require('yeoman-generator').test;
const {expect, assert} = require('chai');
const debug = require('debug')('gentest');

const TIMEOUT = 60000;

describe('generator-ats-node-webapp:app', function () {
  let context = null;

  before(function (done) {
    this.timeout(TIMEOUT);
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
        .withOptions({skipInstall: true, client: client, server: server, name: `${client}_${server}`})
        .on('end', () => {
          fs.symlinkSync(path.join(__dirname, '../node_modules'), path.join(dir, 'node_modules'));
          cb();
        });
    });
  }

  function checkExecOutput(done, test) {
    return (err, stdout, stderr) => {
      const out = '' + stdout;
      const errs = '' + stderr;
      debug(out);
      debug(errs);

      if (err) {
        done(err);
      } else {
        expect(errs).to.equal('');
        if (out.indexOf(test) == -1) {
          assert.fail('Execution Failed');
        }
        expect(out.indexOf(test)).to.be.greaterThan(-1);
        done();
      }
    };
  }

  const BUILD_DONE = 'Finished \'default\' after';

  it('can create a buildable React fullstack project', function (done) {
    this.timeout(TIMEOUT);
    generateProject('react', 'full', () => {
      exec('npm run create-app-symlink && gulp', { env: process.env }, checkExecOutput(done, BUILD_DONE));
    });
  });

  it('can create a buildable Angular fullstack project', function (done) {
    this.timeout(TIMEOUT);
    generateProject('angular', 'full', () => {
      exec('npm run create-app-symlink && npm run create-public-symlink && gulp', { env: process.env }, checkExecOutput(done, BUILD_DONE));
    });
  });

  it('can create a buildable React client-only project', function (done) {
    this.timeout(TIMEOUT);
    generateProject('react', 'thin', () => {
      exec('gulp', { env: process.env }, checkExecOutput(done, BUILD_DONE));
    });
  });

  it('can create a buildable Angular client-only project', function (done) {
    this.timeout(TIMEOUT);
    generateProject('angular', 'thin', () => {
      exec('npm run create-public-symlink && gulp', { env: process.env }, checkExecOutput(done, BUILD_DONE));
    });
  });
});
