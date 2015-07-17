/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
const debug = require('debug')('app:persistence:seeding');

function createTestUsers(User) {
    debug('creating test users');
    return User.createQ({ email: 'test@atsid.com', password: 'abc123' });
}

function resetUsers(User) {
    debug('resetting users');
    return User.removeQ().then(() => createTestUsers(User));
}

function seedData(models) {
    debug('loading seed data');
    const User = models.User;

    return Promise.all([
        resetUsers(User),
    ]).then(() => debug('seed data populated'));
}

module.exports = {seedData};
