/**
 * A middleware function ta add client-side cache-control headers
 * @param directive
 */
module.exports = (directive) => (req, res, next) => {
  res.cacheControl(directive);
  next();
};
