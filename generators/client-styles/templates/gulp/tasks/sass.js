const gulp = require('gulp');
const sass = require('gulp-sass');
const config = require('../config');

const STYLES_GLOB = 'client/styles/**/*.scss';

gulp.task('sass', () => {
    gulp.src(STYLES_GLOB)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(config.client.dist.path));
});

gulp.task('styles', ['sass']);
