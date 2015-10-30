/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
const log = require('log4js').getLogger('app:persistence:seeding');

function createTestUsers(Users) {
  log.debug('creating test users');
  return Users.create({email: 'test@atsid.com', password: 'abc123'});
}

function resetUsers(Users) {
  log.debug('resetting users');
  return Users.deleteAll().then(() => createTestUsers(Users));
}

function seedData(repositories) {
  log.debug('loading seed data');
  const Users = repositories.Users;

  const resetPromises = [
    resetUsers(Users),
  ];
  return Promise.all(resetPromises)
    .then(() => log.debug('seed data populated'))
    .catch((err) => log.debug('error seeding data', err));
}

module.exports = {seedData};
