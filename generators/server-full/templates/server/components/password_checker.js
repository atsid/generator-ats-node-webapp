const config = require('config');
const log = require('log4js').getLogger('app:components:password_checker');
const bcrypt = require('bcryptjs');
const saltWorkFactor = config.auth.local.password.saltWorkFactor;

function autohandle(resolve, reject) {
  return (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  };
}

function hash(pw, salt) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(pw, salt, autohandle(resolve, reject));
  });
}

function genSalt(workFactor) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(workFactor, autohandle(resolve, reject));
  });
}

function compare(password, hashed) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashed, autohandle(resolve, reject));
  });
}

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
  log.debug('checking user password');
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
