function getConnectionString(config) {
    const db = config.database;
    const isComposed = parseInt(config.container.composed, 10);

    function composeConnectionString() {
        const host = db.composeConnection.host;
        const port = db.composeConnection.port;
        const dbName = db.composeConnection.dbName;
        return `mongodb://${host}:${port}/${dbName}`;
    }

    return isComposed ? composeConnectionString() : db.connectionString;
}

module.exports = getConnectionString;
