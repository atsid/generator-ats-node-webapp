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
    },<% if (facebookAuth) { %>

    /**
     * A user's unique Facebook profile ID
     */
    facebookId: {
        type: String,
        index: true,
    },<% } if (twitterAuth) { %>

    /**
     * A user's unique Twitter profile ID
     */
    twitterId: {
        type: String,
        index: true,
    },<% } if (googleAuth) { %>

    /**
    * A user's unique Google profile ID
    */
    googleId: {
       type: String,
       index: true,
    },<% } if (githubAuth) { %>

    /**
    * A user's unique Github profile ID
    */
    githubId: {
       type: String,
       index: true,
    },<% } %>
};
