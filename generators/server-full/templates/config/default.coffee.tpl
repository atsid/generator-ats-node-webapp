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
<% } if (useOAuthStrategy('linkedin')) { %>
    linkedin:
      clientID: 'your_consumer_key'
      clientSecret: 'bogus_secret'
      callbackURL: 'http://localhost:9000/api/auth/linkedin/callback'
      scope: ['r_basicprofile', 'r_emailaddress']
<% } %>

  container:
    composed: 0

  clustering:
    workerLimit: 1
    entryPoint: __dirname + '/../server/main'

  server:
    port: 9000
    webpackHotLoader: 0

  database:
<% if (useDatabase('mongodb')) { %>
    connectionString: 'mongodb://localhost/<%= name %>'
    composeConnection:
      dbName: '<%= name %>'
<% } if (useDatabase('sequelize')) { %>
    connection:
      user: 'root'
      password: ''
      port: 3306
      host: 'localhost'
      dbName: '<%= name.replace(/-/g,'_') %>'
      dialect: 'mysql'
<% } %>
    populateSeedData: true
