const config = require('config');
const getConnectionString = require('./get_connection_string');
const mongoose = require('mongoose');

/**
 * Initializes the MongoDB Connection
 */
function connect() {
  const connectionString = getConnectionString(config);
  mongoose.connect(connectionString);
}

connect();
module.exports = mongoose;
