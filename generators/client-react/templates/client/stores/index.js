const NyanStore = require('./nyan_store');

module.exports = {
  nyan: new NyanStore(),
  users: new UserStore(),
};
