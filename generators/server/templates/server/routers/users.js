const jefferson = require('express-jefferson');
const users = require('app/middleware/users');

module.exports = jefferson.router({
  proxies: [require('express-jefferson/proxies/promise-handler')],
  routes: {
    '/': {
      get: [users.index],
      post: [users.create],
    },
  },
});
