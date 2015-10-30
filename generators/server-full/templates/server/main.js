const config = require('config');
const log = require('log4js').getLogger('app:main');
const startupHooks = require('./startup_hooks');
const server = require('./server');
const emitListeningMessage = () => log.info('server listening on port ' + config.server.port);
const startListening = () => server.listen(config.server.port, emitListeningMessage);
const catchError = err => log.error('error starting application', err);

log.debug('starting the application');
module.exports = startupHooks.resolve()
  .then(startListening)
  .then(() => server)
  .catch(catchError);
