const _ = require('lodash');

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

module.exports = {
  server: sourceNode('server', 'server'),
  all: sourceNode('all', '{client,server}'),
  build: ['gulpfile.js', 'gulp/**/*.js'],
  client: sourceNode('client', 'client', {
    styles: ['client/styles/**/*.scss'],
    staticJade: ['client/**/*.jade', '!client/**/*.dynamic.jade'],
    assets: ['client/assets/**/*.*'],
    html: ['client/**/*.html'],
    entries: ['client/app.js'],
    dist: {
      path: 'public',
      styles: 'public/styles',
      assets: 'public/assets',
      bundle: 'app.js',
    },
  }),
<% if (client === 'angular') { %>
  ngHtml2Js: {
    module: 'templates',
    baseDir: 'public',
  },
<% } %>
};
