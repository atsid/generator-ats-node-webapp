const gulp = require('gulp');
const lload = require('gulp-livereload');
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');
const config = require('../config');

gulp.task('imagemin', () => {
  return gulp.src(config.client.images)
    .pipe(plumber())
    .pipe(imagemin({
      optimizationLevel: 4,
    }))
    .pipe(gulp.dest(config.client.dist.path))
    .pipe(lload());
});
