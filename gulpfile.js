'use strict';
require('babel/register');
var gulp = require('gulp');
var path = require('path');
var mocha = require('gulp-mocha');
var eslint = require('gulp-eslint');
var runSequence = require('run-sequence');
var babel = require('gulp-babel');
var debug = require('gulp-debug');
var istanbul = require('gulp-istanbul');
var isparta = require('isparta');
var empty = require('gulp-empty');
var changed = require('gulp-changed');
require('gulp-semver-tasks')(gulp);

var DEFAULT_COVERAGE_REPORTERS = ['lcov', 'text-summary'];
var GENERATOR_CODE = ['./{generators,util}/**/*.js', '!./generators/*/templates/**/*'];
var TEST_CODE = ['test/**/*.js'];
var GENERATOR_TEMPLATES = ['./generators/*/templates/**/*'];
var PACKAGE_RESOURCES = ['package.json', 'README.md'];
var DIST = './dist';

function doDebug(name) {
  return debug({title: name})
}

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
