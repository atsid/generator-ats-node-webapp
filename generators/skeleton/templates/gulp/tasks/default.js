const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('build', (cb) => {
  return runSequence(
    'lint',
    'prepare-assets',
    'bundle',
    'test',
    cb
  );
});


gulp.task('default', ['build']);
