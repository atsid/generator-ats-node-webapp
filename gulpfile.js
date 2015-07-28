'use strict';
require('babel/register');
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var eslint = require('gulp-eslint');
var runSequence = require('run-sequence');
var babel = require('gulp-babel');
var debug = require('gulp-debug');
var promise = require('bluebird');
var istanbul = require('gulp-istanbul');
var isparta = require('isparta');
require('gulp-semver-tasks')(gulp);
var DEFAULT_COVERAGE_REPORTERS = ['lcov', 'text-summary'];

gulp.task('test', function (cb) {
    gulp.src(['generators/*/*.js', 'generators/*/phases/**/*.js', 'util/**/*.js'])
        .pipe(istanbul({includeUntested: true, instrumenter: isparta.Instrumenter}))
        .pipe(istanbul.hookRequire())
        .on('error', cb)
        .on('finish', function () {
            gulp.src('test/**/*.js')
                .pipe(mocha())
                .pipe(istanbul.writeReports())
                .on('end', cb);
        });
});

gulp.task('lint', function () {
    return gulp.src(['./generators/**/*.js', '!./generators/**/templates/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('copy-templates', function () {
    return gulp.src('./generators/*/templates/**/*')
        .pipe(debug({title: 'resource'}))
        .pipe(gulp.dest('./dist/generators'));
});

gulp.task('copy-top-level-files', function () {
    return gulp.src(['package.json', 'README.md'])
        .pipe(debug({title: 'resource'}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('copy-resources', [
    'copy-templates',
    'copy-top-level-files',
]);

gulp.task('babel-generators', function () {
    return gulp.src(['./generators/*/*.js', './generators/*/phases/*.js'])
        .pipe(debug({title: 'babel'}))
        .pipe(babel())
        .pipe(gulp.dest('./dist/generators'));
});

gulp.task('babel-util', function () {
    return gulp.src(['./util/**/*'])
        .pipe(debug({title: 'babel'}))
        .pipe(babel())
        .pipe(gulp.dest('./dist/util'));
});

gulp.task('babel', [
    'babel-generators',
    'babel-util',
]);

gulp.task('default', function (cb) {
    runSequence(
        ['copy-resources', 'babel', 'lint'],
        'test',
        cb);
});
