module.exports = (req, res) => {
  if (!req.user) {
    res.status(404).json({message: 'No authenticated user found'});
  } else {
    res.json(req.user.process(req));
  }
  res.end();
};
