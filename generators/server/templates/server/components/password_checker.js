const config = require('config');
const debug = require('debug')('app:components:password_checker');
const bcrypt = require('bcryptjs');
const saltWorkFactor = config.auth.local.password.saltWorkFactor;
const Bluebird = require('bluebird');

const doHash = Bluebird.promisify(bcrypt.hash, bcrypt);
const doSalt = Bluebird.promisify(bcrypt.genSalt, bcrypt);
const doCompare = Bluebird.promisify(bcrypt.compare, bcrypt);

const hash = (pw, salt) => doHash(pw, salt);
const genSalt = (workFactor) => doSalt(workFactor);
const compare = (password, hashed) => doCompare(password, hashed);

/**
 * A predicate promise that determines if a password matches a given encrypted password
 * @param password The plain-text password entered by the client
 * @param userPassword The encrypted user password
 */
function isValidPassword(password, hashed) {
  if (!password) {
    throw new Error(`'password' argument is required`);
  }
  if (!hashed) {
    throw new Error(`'hashed' argument is required`);
  }
  debug('checking user password');
  return compare(password, hashed);
}

/**
 * Encrypts a password
 * @param password The password to encrypt
 */
function encryptPassword(password) {
  if (!password) {
    throw new Error(`'password' argument is required`);
  }
  return genSalt(saltWorkFactor).then(salt => hash(password, salt));
}

module.exports = {
  isValidPassword,
  encryptPassword,
};
