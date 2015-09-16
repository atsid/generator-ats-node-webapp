const User = require('app/persistence').models.User;

module.exports = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  return User.createQ({email, password}).then((user) => {
    res.status(201).json(user.process(req));
  });
};
