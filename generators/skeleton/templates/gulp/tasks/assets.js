const gulp = require('gulp');
const lload = require('gulp-livereload');
const jade = require('gulp-jade');
const plumber = require('gulp-plumber');
const debug = require('gulp-debug');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const changed = require('gulp-changed');
const sourcemaps = require('gulp-sourcemaps');
const cssmin = require('gulp-cssmin');
const config = require('../config');
const empty = require('gulp-empty');

function instrument(glob, title, action, dest, isIncremental) {
  let incrementalTask = empty();
  if (isIncremental) {
    incrementalTask = changed(dest);
  }
  return gulp.src(glob)
             .pipe(plumber())
             .pipe(incrementalTask)
             .pipe(debug({title))
             .pipe(action)
             .pipe(gulp.dest(dest))
             .pipe(lload());
}

gulp.task('jade', () => instrument(config.client.staticJade, 'jade', jade({}), './public/', false));
gulp.task('jade-incr', () => instrument(config.client.staticJade, 'jade', jade({}), './public/', true));

gulp.task('html', () => instrument(config.client.html, 'html', empty(), config.client.dist.path, false));
gulp.task('html-incr', () => instrument(config.client.html, 'html', empty(), config.client.dist.path, true));

gulp.task('assets', () => instrument(config.client.assets, 'asset', empty(), config.client.dist.assets, false));
gulp.task('assets-incr', () => instrument(config.client.assets, 'asset', empty(), config.client.dist.assets, true));

gulp.task('imagemin', () => instrument(config.client.images, 'image', imagemin(config.imagemin), config.client.dist.path, false));
gulp.task('imagemin-incr', () => instrument(config.client.images, 'image', imagemin(config.imagemin), config.client.dist.path, true));

gulp.task('sass', () => {
  return instrument(config.client.styles, 'sass')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cssmin())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.client.dist.path))
    .pipe(lload());
});

gulp.task('prepare-assets', [
  'jade',
  'html',
  'assets',
  'sass',
  'imagemin',
]);
