const _ = require('lodash');
const babelify = require('babelify');<% if (client === 'angular') { %>
const ngHtml2Js = require('browserify-ng-html2js');<% } %>

function sourceNode(rootName, root, extra = {}) {
  return _.merge({
    all: [root + '/**/*.js'],
    source: [root + '/**/*.js', '!' + root + '/**/*.spec.js', '!' + root + '/**/*spec*/*'],
    test: [root + '/**/*.spec.js', root + '/**/*spec*/*'],
    output: {
      coverage: 'target/test-reports/' + rootName,
    },
  }, extra);
}

const CLIENT_ENTRIES = ['client/app.js'];

module.exports = {
  server: sourceNode('server', 'server'),
  all: sourceNode('all', '{client,server}'),
  build: ['gulpfile.js', 'gulp/**/*.js'],
  client: sourceNode('client', 'client', {
    styles: ['client/**/*.{scss,sass}'],
    images: ['client/**/*.{gif,jpeg,jpg,png,svg}'],
    staticJade: ['client/**/*.jade', '!client/**/*.dynamic.jade'],
    assets: ['client/assets/**/*.*'],
    html: ['client/**/*.html'],
    entries: CLIENT_ENTRIES,
    dist: {
      path: 'public',
      styles: 'public/styles',
      assets: 'public/assets',
      bundle: 'app.js',
    },
  }),
  imagemin: { optimizationLevel: 4 },
  browserify: {
    entries: CLIENT_ENTRIES,
    transform: [
      babelify,<% if (client === 'angular') { %>
      ngHtml2Js({
        module: 'templates',
        baseDir: 'public',
      }),<% } %>
      'browserify-shim',
    ],
    debug: false,
    cache: {},
    packageCache: {},
  },
};
