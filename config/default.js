const { env } = process;

module.exports = {
    app: { nodeEnv: env.ENV || env.NODE_ENV, port: env.PORT || 3000 },
    db: {
        url: env.MONGO_URL || 'mongodb://mongo:27017/wake_cap_db',
    },
    api: {
        version: 'v1',
    },
    reports: {
        path: './reports',
    },
    logging: {
        logDir: env.LOG_DIR || 'logs',
        logLevel: env.LOG_LEVEL || 'info',
        logFile: env.LOG_FILE || 'app.log',
    },
};
