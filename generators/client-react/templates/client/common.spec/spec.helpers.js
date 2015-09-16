const INITIAL_DOM = '<!doctype html><html><body></body></html>';
const Bluebird = require('bluebird');
const jsdom = require('jsdom');

module.exports = {
  bootstrapDom(scripts = []) {
    return new Bluebird((resolve, reject) => {
      jsdom.env(INITIAL_DOM, scripts,
        function onJsdom(err, window) {
          if (err) {
            reject(err);
          } else {
            global.window = window;
            global.navigator = window.navigator;
            global.document = window.document;
            resolve(window);
          }
        }
      );
    });
  },
};
