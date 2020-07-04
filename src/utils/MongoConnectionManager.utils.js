import mongoose from 'mongoose';
import config from 'config';
import logger from './Logger.util';

const { url } = config.get('db');

const initMongoConnection = (app) => {
    mongoose.connect(
        url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        },
        null
    );

    mongoose.connection.on('connected', () => {
        logger.info(`Mongoose default connection is open to  ${url}`);
        app.emit('ready');
    });

    mongoose.connection.on('error', (err) => {
        logger.log(`Mongoose default connection has occured ${err} error`);
    });

    mongoose.connection.on('disconnected', () => {
        logger.info(`Mongoose default connection is disconnected`);
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            logger.info(
                `Mongoose default connection is disconnected due to application termination`
            );
            process.exit(0);
        });
    });
};

export default initMongoConnection;
