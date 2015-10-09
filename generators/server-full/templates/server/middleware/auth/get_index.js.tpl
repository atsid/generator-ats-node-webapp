module.exports = (req, res) => {
  res.json({
    options: ['GET'],
    links: {
      'current': '/auth/current',
      'local': '/auth/local',
<% if (useOAuthStrategy('facebook')) { %>
      'facebook': '/auth/facebook',
<% } if (useOAuthStrategy('twitter')) { %>
      'twitter': '/auth/twitter',
<% } if (useOAuthStrategy('google')) { %>
      'google': '/auth/google',
<% } if (useOAuthStrategy('github')) { %>
      'github': '/auth/github',
<% } if (useOAuthStrategy('linkedin')) { %>
      'github': '/auth/linkedin',
<% } %>
    },
  });
  res.end();
};
