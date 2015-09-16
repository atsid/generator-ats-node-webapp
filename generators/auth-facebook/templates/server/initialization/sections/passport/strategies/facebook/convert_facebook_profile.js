const hat = require('hat');
module.exports = (profile) => {
  return {
    name: profile.name,
    facebookId: profile.id,
    password: hat(),
  };
};
