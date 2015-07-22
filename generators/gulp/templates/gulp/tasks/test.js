const Bluebird = require('bluebird');
const gulp = require('gulp');
const gutil = require('gulp-util');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const isparta = require('isparta');
const exit = require('gulp-exit');
const config = require('../config');

const DEFAULT_COVERAGE_REPORTERS = ['lcov', 'text-summary'];
const DEFAULT_SPEC_REPORTER = 'spec';

function handleErr(tdd, resolve, reject) {
    return (err) => {
        if (tdd) {
            gutil.log('TDD Error: ', err);
            resolve();
        } else {
            reject(err);
        }
    };
}

/**
 * Executes the Mocha Tests
 */
function test(glob, reporter = DEFAULT_SPEC_REPORTER) {
    return new Promise((resolve, reject) => {
        gulp.src(glob)
            .pipe(mocha({reporter: reporter, timeout: 100000}))
            .on('error', reject)
            .on('end', resolve);
    });
}

/**
 * Writes coverage reports
 */
function writeReports(sourceGlob, outputDir, reporters = DEFAULT_COVERAGE_REPORTERS) {
    return gulp.src(sourceGlob)
        .pipe(istanbul.writeReports({dir: outputDir, reporters: reporters}))
        .pipe(exit());
}

/**
 * Executes coverage-instrumented tests
 */
function runTests(sourceGlob, testGlob, reportDir, reporter = DEFAULT_SPEC_REPORTER, coverageReporters = DEFAULT_COVERAGE_REPORTERS, tdd = false) {
    return new Bluebird((resolve, reject) => {
        gulp.src(sourceGlob)
            .pipe(istanbul({includeUntested: true, instrumenter: isparta.Instrumenter}))
            .on('error', handleErr(tdd, resolve, reject))
            .pipe(istanbul.hookRequire())
            .on('error', handleErr(tdd, resolve, reject))
            .on('finish', () => {
                test(testGlob, reporter)
                .then(() => writeReports(sourceGlob, reportDir, coverageReporters))
                .then(resolve)
                .catch((err) => {
                    gutil.log('Error Testing', err);
                    if (tdd) {
                        resolve();
                    } else {
                        /* eslint-disable */
                        process.exit(1);
                        /* eslint-enable */
                    }
                });
            });
    });
}

function defineTestingTasks(task, root) {
    gulp.task(`${task}-unit-test`, () => runTests(root.source, root.test, root.output.coverage));
    gulp.task(`${task}-unit-test-tdd`, () => runTests(root.source, root.test, root.output.coverage, 'nyan', ['text-summary'], true));
    gulp.task(`${task}-tdd`, () => {
        gulp.watch(root.all, [`lint-${task}-tdd`, `${task}-unit-test-tdd`]);
    });
}

defineTestingTasks('server', config.server);
defineTestingTasks('client', config.client);
defineTestingTasks('all', config.all);
gulp.task('test', ['all-unit-test']);
