const debug = require('debug')('app:middleware:force_ssl');

/**
 * An express handler that redirects HTTP input to HTTPS port
 */
// HTTP Requests that are not health-checks should
// be redirected to the SSL URI on the Load-Balancer.
// The load-balancer will handle request decryption.
function forceSsl(req, res, next) {
  const isHealthCheck = () => req.url === '/api';
  const isForwardedHttp = () => req.headers['x-forwarded-proto'] === 'http';
  const getHost = () => req.headers.host;

  if (isForwardedHttp() && !isHealthCheck()) {
    const newUrl = `https://${getHost()}${req.url}`;
    debug(`Redirect HTTP request => ${newUrl}`);
    res.redirect(newUrl);
  } else {
    next();
  }
}

module.exports = forceSsl;
