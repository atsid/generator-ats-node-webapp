const gulp = require('gulp');
const sass = require('gulp-sass');
const lload = require('gulp-livereload');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const cssmin = require('gulp-cssmin');
const config = require('../config');

gulp.task('sass', () => {
  gulp.src(config.client.styles)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cssmin())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.client.dist.path))
    .pipe(lload());
});

gulp.task('styles', ['sass']);
