module.exports =
    app:
        name: '<%= name %>'

    session:
        name: '<%= name %>'
        secret: 'random_gibberish'
        proxy: true

    auth:
        facebook:
            clientID: "your_client_id"
            clientSecret: "bogus_secret"
            callbackUrl: "http://localhost:9000/api/auth/facebook/callback"
        twitter:
            consumerKey: "your_consumer_key"
            consumerSecret: "bogus_secret"
            callbackURL: "http://localhost:9000/api/auth/twitter/callback"

    container:
        composed: 0

    security:
        password:
            saltWorkFactor: 10

    clustering:
        workerLimit: 1
        entryPoint: __dirname + "/../server/main"

    server:
        port: 9000

    database:
        connectionString: 'mongodb://localhost/<%= name %>'
        populateSeedData: true
        composeConnection:
            dbName: "<%= name %>"
