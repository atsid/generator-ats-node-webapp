const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('default', (cb) => {
    return runSequence(
        'lint',
        'sass',
        'copy',
        'browserify',
        'test',
        cb
    );
});
