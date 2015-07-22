module.exports = (req, res) => {
    res.json({
        options: ['GET'],
        links: {
            'current': '/auth/current',
            'local': '/auth/local',<% if (facebookAuth) { %>
            'facebook': '/auth/facebook',<% } %><% if (twitterAuth) { %>
            'twitter': '/auth/twitter',<% } %>
        },
    });
    res.end();
};
