const gulp = require('gulp');
const gutil = require('gulp-util');
const config = require('../config');

const browserify = require('browserify');
const babelify = require('babelify');
const uglifyify = require('uglifyify');
const source = require('vinyl-source-stream');
const envify = require('envify/custom');
const buffer = require('vinyl-buffer');

gulp.task('browserify', () => {
    const b = browserify({
        entries: config.client.entries,
        transform: [babelify, [envify({_: 'purge', NODE_ENV: 'production'}), { global: true }], [uglifyify, { global: true }]],
        debug: false,
        cache: {},
        packageCache: {},
    });

    b.on('log', gutil.log);

    return b
        .bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source(config.client.dist.bundle))
        .pipe(buffer())
        .pipe(gulp.dest(config.client.dist.path));
});
