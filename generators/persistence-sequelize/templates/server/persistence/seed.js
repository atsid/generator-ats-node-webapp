/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
const log = require('log4js').getLogger('app:persistence:seeding');
const sequelize = require('./sequelize');

function createTestUsers(Users) {
  log.debug('creating test users');
  return Users.create({email: 'test@atsid.com', password: 'abc123'});
}

function resetUsers(Users) {
  log.debug('resetting users');
  return createTestUsers(Users);
}

function seedData(repositories) {
  log.debug('loading seed data');
  const Users = repositories.Users;
  return sequelize.sync({force: true})
    .then(() => [resetUsers(Users)])
    .then(() => log.debug('seed data populated'));
}

module.exports = {seedData};
