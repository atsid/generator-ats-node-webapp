const config = require('config');
const Sequelize = require('sequelize');
const log = require('debug')('sequelize');

const sequelize = new Sequelize(
  config.database.connection.dbName,
  config.database.connection.user,
  config.database.connection.password,
  {
    port: config.database.connection.port,
    host: config.database.connection.host,
    dialect: config.database.connection.dialect,
    logging: log,
  }
);
module.exports = sequelize;
