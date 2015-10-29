/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
const debug = require('debug')('app:persistence:seeding');
const sequelize = require('./sequelize');
function createTestUsers(Users) {
  debug('creating test users');
  return Users.create({email: 'test@atsid.com', password: 'abc123'});
}

function resetUsers(Users) {
  debug('resetting users');
  return createTestUsers(Users);
}

function seedData(repositories) {
  debug('loading seed data');
  const Users = repositories.Users;
  return sequelize.sync({force: true})
    .then(() => [resetUsers(Users)])
    .then(() => debug('seed data populated'));
}

module.exports = {seedData};
