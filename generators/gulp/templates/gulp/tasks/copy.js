const gulp = require('gulp');
const config = require('../config');

gulp.task('copy-html', () => {
    return gulp.src(config.client.html)
        .pipe(gulp.dest(config.client.dist.path));
});

gulp.task('copy-assets', () => {
    return gulp.src(config.client.assets)
        .pipe(gulp.dest(config.client.dist.assets));
});

gulp.task('copy', ['copy-html', 'copy-assets']);
