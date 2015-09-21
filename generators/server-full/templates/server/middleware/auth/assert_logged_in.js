const NotAuthorizedError = require('app/errors/not_authorized');

module.exports = (req, res, next) => {
  if (!req.user) {
    throw new NotAuthorizedError('User must be logged in');
  }
  next();
};
