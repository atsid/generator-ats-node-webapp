const React = require('react/addons');

const Login = React.createClass({
  getInitialState() {
    return {};
  },

  render() {
    return (
      <div>
<% if (useOAuthStrategy('facebook')) { %>
      <a href="/api/auth/facebook">Login with Facebook</a><% } %>
<% if (useOAuthStrategy('twitter')) { %>
      <a href="/api/auth/twitter">Login with Twitter</a><% } %>
<% if (useOAuthStrategy('google')) { %>
      <a href="/api/auth/google">Login with Google</a><% } %>
<% if (useOAuthStrategy('github')) { %>
      <a href="/api/auth/google">Login with Github</a><% } %>
      </div>
    );
  },
});

module.exports = Login;
