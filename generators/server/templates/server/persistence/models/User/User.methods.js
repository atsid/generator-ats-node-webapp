const passwordChecker = require('app/components/password_checker');

/**
 * Determines if the given password matches the user's password
 * @param password the input password
 */
function isValidPassword(password) {
  return passwordChecker.isValidPassword(password, this.password);
}

function process(req) {
  const result = this.toObject();
  if (!req.user || `${req.user.id}` !== `${result.id}`) {
    delete result.facebookId;
    delete result.twitterId;
  }
  delete result.password;
  delete result._id;
  delete result.__v;
  return result;
}

/**
 * Schema Methods:
 * Schemas should act as facades that thunk out to smaller components that handle singular concerns.
 */
module.exports = {isValidPassword, process};
