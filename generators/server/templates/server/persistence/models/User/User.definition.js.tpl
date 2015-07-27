module.exports = {
    /**
     * The user's email address, which is their unique login
     */
    email: {
        type: String,
        index: true,
    },

    /**
     * A name by which we can address the user
     */
    name: {
        type: String,
    },

    /**
     * The user password, encrypted
     */
    password: {
        type: String,
        required: true,
    },
<% if (useOAuthStrategy('facebook')) { %>

    /**
     * A user's unique Facebook profile ID
     */
    facebookId: {
        type: String,
        index: true,
    },
<% } if (useOAuthStrategy('twitter')) { %>

    /**
     * A user's unique Twitter profile ID
     */
    twitterId: {
        type: String,
        index: true,
    },
<% } if (useOAuthStrategy('google')) { %>

    /**
    * A user's unique Google profile ID
    */
    googleId: {
       type: String,
       index: true,
    },
<% } if (useOAuthStrategy('github')) { %>

    /**
    * A user's unique Github profile ID
    */
    githubId: {
       type: String,
       index: true,
    },
<% } %>
};
