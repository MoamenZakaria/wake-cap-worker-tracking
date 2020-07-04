class NoDataFoundError extends Error {
    /**
     * custom error to add user friendly message and keep stacktrace and original error message
     * @param message
     * @param err
     */
    constructor(message) {
        super(message);
        Error.captureStackTrace(this, NoDataFoundError);
    }
}

module.exports = NoDataFoundError;
