const jefferson = require('express-jefferson');
const root = require('app/middleware/root');

module.exports = jefferson.router({
  routes: {
    '/': {
      get: [root.get],
    },
  },
});
