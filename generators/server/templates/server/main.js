const config = require('config');
const debug = require('debug')('app:main');
const startupHooks = require('./startup_hooks');
const server = require('./server');
const emitListeningMessage = () => debug('server listening on port ' + config.server.port);
const startListening = () => server.listen(config.server.port, emitListeningMessage);
const catchError = err => debug('error starting application', err);

debug('starting the application');
module.exports = startupHooks.resolve()
    .then(startListening)
    .then(() => server)
    .catch(catchError);
