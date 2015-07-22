class BadRequestError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.httpStatus = 400;
    }
}
module.exports = BadRequestError;
