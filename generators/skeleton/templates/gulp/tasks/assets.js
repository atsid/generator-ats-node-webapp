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

function instrument(glob, title, action, dest, changedArgs) {
  return gulp.src(glob)
    .pipe(plumber())
    .pipe((!!changedArgs ? changed(dest, changedArgs) : empty()))
    .pipe(debug({title}))
    .pipe(action)
    .pipe(gulp.dest(dest))
    .pipe(lload());
}

gulp.task('jade', () => instrument(config.client.staticJade, 'jade', jade({}), './public/'));
gulp.task('jade-incr', () => instrument(config.client.staticJade, 'jade', jade({}), './public/', {extension: '.html'}));

gulp.task('html', () => instrument(config.client.html, 'html', empty(), config.client.dist.path));
gulp.task('html-incr', () => instrument(config.client.html, 'html', empty(), config.client.dist.path, {}));

gulp.task('assets', () => instrument(config.client.assets, 'asset', empty(), config.client.dist.assets));
gulp.task('assets-incr', () => instrument(config.client.assets, 'asset', empty(), config.client.dist.assets, {}));

gulp.task('imagemin', () => instrument(config.client.images, 'image', imagemin(config.imagemin), config.client.dist.path));
gulp.task('imagemin-incr', () => instrument(config.client.images, 'image', imagemin(config.imagemin), config.client.dist.path, {}));

gulp.task('sass', () => {
  return gulp.src(config.client.styles)
    .pipe(plumber())
    .pipe(debug({title: 'sass'}))
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
