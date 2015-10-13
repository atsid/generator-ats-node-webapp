const _ = require('lodash');
const gulp = require('gulp');
const gutil = require('gulp-util');
const config = require('../config');

const watchify = require('watchify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const lload = require('gulp-livereload');
const source = require('vinyl-source-stream');
<% if (client === 'react') { %>
const lrload = require('livereactload');
<% } %>
const plumber = require('gulp-plumber');

gulp.task('watch-client', () => {
  gulp.watch(config.client.all, ['lint-client-tdd', 'test-client-tdd']);
  gulp.watch(config.client.html, ['html-incr']);
  gulp.watch(config.client.assets, ['assets-incr']);
  gulp.watch(config.client.images, ['imagemin-incr']);
  gulp.watch(config.client.staticJade, ['jade-incr']);
  gulp.watch(config.client.styles, ['sass']);

  // watch sass
  lload.listen();
<% if (client === 'react') { %>
  // watch client js
  lrload.monitor(config.client.dist.path + '/' + config.client.dist.bundle, {displayNotification: true});
<% } %>
  const b = _.cloneDeep(config.browserify);
<% if (client === 'react') { %>
  b.transform.push(lrload);
<% } %>
  b.debug = true;
  b.fullPaths = true;

  const watcher = watchify(browserify(b));
  function bundle() {
    return watcher
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Bundling Error'))
      .pipe(plumber())
      .pipe(source(config.client.dist.bundle))
      .pipe(buffer())
      .pipe(gulp.dest(config.client.dist.path));
  }

  watcher.on('update', bundle);
  watcher.on('log', gutil.log);
  watcher.on('error', gutil.log.bind(gutil, 'Watcher Error'));
  return bundle();
});
