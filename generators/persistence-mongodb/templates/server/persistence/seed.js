/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
const log = require('debug')('app:persistence:seeding');

function createTestUsers(Users) {
  log('creating test users');
  return Users.create({email: 'test@atsid.com', password: 'abc123'});
}

function resetUsers(Users) {
  log('resetting users');
  return Users.deleteAll().then(() => createTestUsers(Users));
}

function seedData(repositories) {
  log('loading seed data');
  const Users = repositories.Users;

  const resetPromises = [
    resetUsers(Users),
  ];
  return Promise.all(resetPromises)
    .then(() => log('seed data populated'))
    .catch((err) => log('error seeding data', err));
}

module.exports = {seedData};
