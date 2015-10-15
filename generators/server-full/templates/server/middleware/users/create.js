const User = require('app/persistence').repositories.Users;

module.exports = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  return User.create({email, password}).then((user) => {
    res.status(201).json(user.process(req));
  });
};
