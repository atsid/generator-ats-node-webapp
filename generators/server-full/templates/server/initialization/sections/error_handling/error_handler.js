const log = require('log4js').getLogger('app:errors');

module.exports = (err, req, res, next) => {
  if (req.body && req.body.password) {
    delete req.body.password;
  }
  log.debug(`handling error on path ${req.url} with payload`, req.body, err, err.stack);

  const statusCode = err.httpStatus || 500;
  const message = err.message || 'An error occurred with the services.';
  res.status(statusCode).send(message);
  next();
};
