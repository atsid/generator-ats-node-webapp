class NotFoundError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.httpStatus = 404;
  }
}
module.exports = NotFoundError;
