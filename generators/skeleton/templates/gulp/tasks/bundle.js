const gulp = require('gulp');
const webpack = require('gulp-webpack');
const webpackConfig = require('../../webpack.config.prod');
const plumber = require('gulp-plumber');


gulp.task('bundle', ['prepare-assets'], () => {
  return gulp.src('client/app.js')
    .pipe(plumber())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('public/'));
});
