class ExpressError extends Error {
    constuctor(message, statusCode) {
        supper();
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;