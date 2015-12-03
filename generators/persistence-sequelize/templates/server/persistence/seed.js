/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
const log = require('debug')('app:persistence:seeding');
const sequelize = require('./sequelize');

function createTestUsers(Users) {
  log('creating test users');
  return Users.create({email: 'test@atsid.com', password: 'abc123'});
}

function resetUsers(Users) {
  log('resetting users');
  return createTestUsers(Users);
}

function seedData(repositories) {
  log('loading seed data');
  const Users = repositories.Users;
  return sequelize.sync({force: true})
    .then(() => [resetUsers(Users)])
    .then(() => log('seed data populated'));
}

module.exports = {seedData};
