const gulp = require('gulp');
const lload = require('gulp-livereload');
const config = require('../config');
<% if (client === 'angular') { %>
const jade = require('gulp-jade');
const extReplace = require('gulp-ext-replace');

gulp.task('process-jade', () => {
    return gulp.src(config.client.staticJade)
        .pipe(jade({}))
        .pipe(extReplace('.html', '.static.html'))
        .pipe(gulp.dest('./public/'))
        .pipe(lload());
});
<% } %>

gulp.task('copy-html', () => {
    return gulp.src(config.client.html)
        .pipe(gulp.dest(config.client.dist.path))
        .pipe(lload());
});

gulp.task('copy-assets', () => {
    return gulp.src(config.client.assets)
        .pipe(gulp.dest(config.client.dist.assets))
        .pipe(lload());
});

gulp.task('prepare-assets', [
<%if (client === 'angular') { %>
    'process-jade',
<%}%>
    'copy-html',
    'copy-assets',
]);
