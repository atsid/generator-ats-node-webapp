const NyanStore = require('./nyan_store');
const UserStore = require('./user_store');

module.exports = {
  nyan: new NyanStore(),
  users: new UserStore(),
};
