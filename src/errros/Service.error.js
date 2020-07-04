class ServiceError extends Error {
    /**
     * custom error to add user friendly message and keep stacktrace and original error message
     * @param message
     * @param err
     */
    constructor(message, err) {
        super(err.message);
        this.userMessage = message;
        Error.captureStackTrace(this, ServiceError);
    }
}

module.exports = ServiceError;
