module.exports =
    session:
        secret: "SESSION_STATE_SECRET"

    container:
        composed: "DOCKER_COMPOSED"

    clustering:
        workerLimit: "CLUSTERING_WORKER_LIMIT"

    database:
        connectionString: "DB_CONNECTION_STRING"
        composeConnection:
            host: "MONGO_1_PORT_27017_TCP_ADDR"
            port: "MONGO_1_PORT_27017_TCP_PORT"
