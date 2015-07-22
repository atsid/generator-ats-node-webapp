const gulp = require('gulp');
const gutil = require('gulp-util');
const config = require('../config');

const watchify = require('watchify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

const lrload = require('livereactload');

gulp.task('watch', () => {
    // watch js and lint
    gulp.watch(config.client.all, ['lint-client-tdd', 'client-unit-test-tdd']);

    // watch html
    gulp.watch(config.client.html, ['copy']);

    // watch sass
    gulp.watch(config.client.styles, ['sass']);

    // watch client js
    lrload.monitor(`${config.client.dist.path}/${config.client.dist.bundle}`, {displayNotification: true});

    const watcher = watchify(browserify({
        entries: config.client.entries,
        transform: [babelify, lrload],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true,
    }));

    function bundle() {
        return watcher
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .bundle()
            .on('error', gutil.log.bind(gutil, 'Bundling Error'))
            .pipe(source(config.client.dist.bundle))
            .pipe(buffer())
            .pipe(gulp.dest(config.client.dist.path));
    }

    watcher.on('update', bundle);
    watcher.on('log', gutil.log);
    watcher.on('error', gutil.log.bind(gutil, 'Watcher Error'));
    return bundle();
});
