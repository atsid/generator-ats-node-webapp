const babelify = require('babelify');
const config = require('../config');<% if (client === 'angular') { %>
const ngHtml2Js = require('browserify-ng-html2js');<% } %>

module.exports = () => {
    return {
        entries: config.client.entries,
        transform: [babelify<% if (client === 'angular') { %>, ngHtml2Js(config.ngHtml2Js)<% } %>],
        debug: false,
        cache: {},
        packageCache: {},
    };
};
