module.exports =
    app:
        name: '<%= name %>'

    session:
        name: '<%= name %>'
        secret: 'random_gibberish'
        proxy: true

    auth:
        local:
            password:
                saltWorkFactor: 10
<% if (useOAuthStrategy('facebook')) { %>
        facebook:
            clientID: 'your_client_id'
            clientSecret: 'bogus_secret'
            callbackUrl: 'http://localhost:9000/api/auth/facebook/callback'
<% } %><% if (useOAuthStrategy('twitter')) { %>
        twitter:
            consumerKey: 'your_consumer_key'
            consumerSecret: 'bogus_secret'
            callbackURL: 'http://localhost:9000/api/auth/twitter/callback'
<% } %><% if (useOAuthStrategy('google')) { %>
        google:
            clientID: 'your_consumer_key'
            clientSecret: 'bogus_secret'
            callbackURL: 'http://localhost:9000/api/auth/google/callback'
            scope: 'https://www.googleapis.com/auth/plus.login'
<% } if (useOAuthStrategy('github')) { %>
        github:
            clientID: 'your_consumer_key'
            clientSecret: 'bogus_secret'
            callbackURL: 'http://localhost:9000/api/auth/github/callback'
            scope: ['user:email']
<% } %>

    container:
        composed: 0

    clustering:
        workerLimit: 1
        entryPoint: __dirname + '/../server/main'

    server:
        port: 9000

    database:
        connectionString: 'mongodb://localhost/<%= name %>'
        populateSeedData: true
        composeConnection:
            dbName: '<%= name %>'
