const gulp = require('gulp');
const sass = require('gulp-sass');
const lload = require('gulp-livereload');
const config = require('../config');
const plumber = require('gulp-plumber');

gulp.task('sass', () => {
  gulp.src(config.client.styles)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(config.client.dist.path))
    .pipe(lload());
});

gulp.task('styles', ['sass']);
