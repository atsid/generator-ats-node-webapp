const jsdom = require('jsdom');

// A super simple DOM ready for React to render into
// Store this DOM and the window in global scope ready for React to access
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.location = document.location;
global.navigator = window.navigator;

// load angular into the global space
require('angular/angular');
global.angular = global.window.angular;

// inject mocha into the window
window.mocha = true;
window.beforeEach = beforeEach;
window.afterEach = afterEach;
require('angular-mocks/angular-mocks');

module.exports = {};
