const gulp = require('gulp');
const config = require('../config');<% if (client === 'angular') { %>
const jade = require('gulp-jade');
const extReplace = require('gulp-ext-replace');

gulp.task('process-jade', () => {
    return gulp.src(['client/**/*.static.jade'])
        .pipe(jade({}))
        .pipe(extReplace('.html', '.static.html'))
        .pipe(gulp.dest('./public/'));
});
<% } %>
gulp.task('copy-html', () => {
    return gulp.src(config.client.html)
        .pipe(gulp.dest(config.client.dist.path));
});

gulp.task('copy-assets', () => {
    return gulp.src(config.client.assets)
        .pipe(gulp.dest(config.client.dist.assets));
});

gulp.task('prepare-assets', [
  <%if (client === 'angular') { %>'process-jade',<%}%>
  'copy-html',
  'copy-assets',
]);
