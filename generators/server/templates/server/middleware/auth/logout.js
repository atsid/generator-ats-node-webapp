module.exports = (req, res) => {
  req.logout();
  res.status(204).send();
};
