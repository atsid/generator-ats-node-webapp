const React = require('react/addons');

const Login = React.createClass({
  getInitialState() {
    return {};
  },

  render() {
    return (
      <div><% if (useOAuthStrategy('facebook')) { %>
        <a href="/api/auth/facebook">Login with Facebook</a>
        <br/><% } if (useOAuthStrategy('twitter')) { %>
        <a href="/api/auth/twitter">Login with Twitter</a>
        <br/><% } if (useOAuthStrategy('google')) { %>
        <a href="/api/auth/google">Login with Google</a>
        <br/><% } if (useOAuthStrategy('github')) { %>
        <a href="/api/auth/github">Login with Github</a>
        <br/><% } %>
      </div>
    );
  },
});

module.exports = Login;
