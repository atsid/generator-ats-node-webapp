class NotAuthorizedError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.httpStatus = 401;
    }
}
module.exports = NotAuthorizedError;
