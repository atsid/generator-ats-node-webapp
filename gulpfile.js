'use strict';
require('babel/register');
const gulp = require('gulp');
const path = require('path');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');
const runSequence = require('run-sequence');
const babel = require('gulp-babel');
const debug = require('gulp-debug');
const istanbul = require('gulp-istanbul');
const isparta = require('isparta');
const empty = require('gulp-empty');
const changed = require('gulp-changed');
require('gulp-semver-tasks')(gulp);

const DEFAULT_COVERAGE_REPORTERS = ['lcov', 'text-summary'];
const GENERATOR_CODE = ['./{generators,util}/**/*.js', '!./generators/*/templates/**/*'];
const GENERATOR_SCRIPTS = ['./scripts/**/*'];
const TEST_CODE = ['test/**/*.js'];
const GENERATOR_TEMPLATES = ['./generators/*/templates/**/*'];
const PACKAGE_RESOURCES = ['package.json', 'README.md'];
const DIST = './dist';

function doDebug(name) {
  return debug({title: name})
}

gulp.task('fail', function() {
  throw new Error('Error Being Thrown');
});

gulp.task('test', function (cb) {
  gulp.src(GENERATOR_CODE)
    .pipe(istanbul({includeUntested: true, instrumenter: isparta.Instrumenter}))
    .pipe(istanbul.hookRequire())
    .on('error', cb)
    .on('finish', function () {
      gulp.src(TEST_CODE)
        .pipe(doDebug('test'))
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .on('end', cb);
    });
});

gulp.task('lint', function () {
  return gulp.src(GENERATOR_CODE)
    .pipe(doDebug('lint'))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('copy-scripts', function() {
  return gulp.src(GENERATOR_SCRIPTS)
    .pipe(doDebug('scripts'))
    .pipe(gulp.dest(path.join(DIST, 'scripts')));
});

gulp.task('copy-templates', function () {
  var target = path.join(DIST, 'generators');
  return gulp.src(GENERATOR_TEMPLATES)
    .pipe(doDebug('resource'))
    .pipe(gulp.dest(target));
});

gulp.task('copy-top-level-files', function () {
  return gulp.src(PACKAGE_RESOURCES)
    .pipe(doDebug('resource'))
    .pipe(gulp.dest(DIST));
});

gulp.task('copy-resources', [
  'copy-templates',
  'copy-top-level-files',
  'copy-scripts'
]);

gulp.task('babel', function () {
  return gulp.src(GENERATOR_CODE)
    .pipe(doDebug('babel'))
    .pipe(babel())
    .pipe(gulp.dest(DIST));
});

gulp.task('compile', function (cb) {
  runSequence(['copy-resources', 'babel', 'lint'], cb);
});

gulp.task('default', function (cb) {
  runSequence(
    'compile',
    'test',
    cb);
});
