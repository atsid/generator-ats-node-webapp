const gulp = require('gulp');
const sass = require('gulp-sass');
const lload = require('gulp-livereload');
const config = require('../config');

gulp.task('sass', () => {
  gulp.src(config.client.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.client.dist.path))
    .pipe(lload());
});

gulp.task('styles', ['sass']);
