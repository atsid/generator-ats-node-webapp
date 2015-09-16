const config = require('config');

function get(req, res) {
  const payload = {
    name: config.app.name,
    status: 'ok',
    links: {
      auth: '/auth',
      users: '/users',
    },
  };
  res.json(payload);
  res.end();
}

module.exports = {get};
