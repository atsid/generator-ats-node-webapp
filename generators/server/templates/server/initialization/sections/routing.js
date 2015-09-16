const mountie = require('express-mountie');
const path = require('path');

module.exports = {
  name: 'app routing',
  configure(app) {
    mountie({
      parent: app,
      src: path.join(__dirname, '../../routers'),
      prefix: (name) => (name === 'root' ? '/api/' : `/api/${name}`),
    });
  },
};
