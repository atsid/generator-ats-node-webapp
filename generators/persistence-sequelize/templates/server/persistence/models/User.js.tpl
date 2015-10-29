const sequelize = require('../sequelize');
const Sequelize = require('sequelize');
const Bluebird = require('bluebird');
const passwordChecker = require('app/components/password_checker');

const USER_ATTRIBUTES = {
  /**
   * The user's email address, which is their unique login
   */
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  /**
   * A name by which we can address the user
   */
  name: {
    type: Sequelize.STRING,
  },

  /**
   * The user password, encrypted
   */
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    set(value) {
      return Bluebird.resolve(true)
            .then(() => passwordChecker.encryptPassword(value))
            .then((hash) => this.password = hash);
    },
  },
<% if (useOAuthStrategy('facebook')) { %>
  /**
   * A user's unique Facebook profile ID
  */
  facebookId: {
    type: Sequelize.STRING,
  },
<% } if (useOAuthStrategy('twitter')) { %>
  /**
   * A user's unique Twitter profile ID
  */
  twitterId: {
    type: Sequelize.STRING,
  },
<% } if (useOAuthStrategy('google')) { %>
  /**
  * A user's unique Google profile ID
  */
  googleId: {
    type: Sequelize.STRING,
  },
<% } if (useOAuthStrategy('github')) { %>
  /**
  * A user's unique Github profile ID
  */
  githubId: {
    type: Sequelize.STRING,
  },
<% } if (useOAuthStrategy('linkedin')) { %>
  /**
  * A user's unique LinkedIn profile ID
  */
  linkedinId: {
    type: Sequelize.STRING,
  },
<% } %>
};

const USER_OPTIONS = {
  indexes: [
    { unique: true, fields: ['email'] },<% if (useOAuthStrategy('facebook')) { %>
    { unique: false, fields: ['facebookId'] },<% } if (useOAuthStrategy('twitter')) { %>
    { unique: false, fields: ['twitterId'] },<% } if (useOAuthStrategy('google')) { %>
    { unique: false, fields: ['googleId'] },<% } if (useOAuthStrategy('github')) { %>
    { unique: false, fields: ['githubId'] },<% } if (useOAuthStrategy('linkedin')) { %>
    { unique: false, fields: ['linkedinId'] },<% } %>
  ],
  instanceMethods: {
    /**
     * Determines if the given password matches the user's password
     * @param password the input password
     */
    isValidPassword(password) {
      return passwordChecker.isValidPassword(password, this.password);
    },

    process(req) {
      const result = this.values;
      if (!req.user || `${req.user.id}` !== `${result.id}`) {
        delete result.facebookId;
        delete result.twitterId;
        delete result.googleId;
        delete result.githubId;
        delete result.linkedinId;
      }
      delete result.password;
      return result;
    },
  },
};

const User = sequelize.define('User', USER_ATTRIBUTES, USER_OPTIONS);
module.exports = User;
