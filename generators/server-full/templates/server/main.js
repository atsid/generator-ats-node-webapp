const config = require('config');
const log = require('debug')('app:main');
const startupHooks = require('./startup_hooks');
const server = require('./server');
const emitListeningMessage = () => log('server listening on port ' + config.server.port);
const startListening = () => server.listen(config.server.port, emitListeningMessage);
const catchError = err => log('error starting application', err);

log('starting the application');
module.exports = startupHooks.resolve()
  .then(startListening)
  .then(() => server)
  .catch(catchError);
