const gulp = require('gulp');
const config = require('../config');

gulp.task('watch-client', () => {
  // Note: this used to contain test-client-tdd, but the Webpack HMR was blowing that up.
  gulp.watch(config.client.all, ['lint-client-tdd']);
  gulp.watch(config.client.html, ['html-incr']);
  gulp.watch(config.client.assets, ['assets-incr']);
  gulp.watch(config.client.images, ['imagemin-incr']);
  gulp.watch(config.client.staticJade, ['jade-incr']);
  gulp.watch(config.client.styles, ['sass']);
});
